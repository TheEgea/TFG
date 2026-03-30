"""
RAG Chatbot backend for TFG documentation.
Uses BM25 retrieval (no embeddings model needed) + Groq free API for generation.
"""

import logging
import os
import re
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel
from rank_bm25 import BM25Okapi

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
DOCS_PATH = os.getenv("DOCS_PATH", "docs/web/docs")

# main.py lives in src/chatbot/backend/ → repo root is 3 levels up
REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent

groq_client = Groq(api_key=GROQ_API_KEY)

# Global BM25 index and chunk store
_bm25: BM25Okapi | None = None
_chunks: list[dict] = []


# ---------------------------------------------------------------------------
# Indexing
# ---------------------------------------------------------------------------

def _find_docs_path() -> Path:
    candidates = [
        REPO_ROOT / DOCS_PATH,
        Path(DOCS_PATH),
        Path.cwd() / DOCS_PATH,
    ]
    for p in candidates:
        if p.exists() and p.is_dir():
            return p.resolve()
    raise FileNotFoundError(
        f"Docs directory not found. Tried: {[str(c) for c in candidates]}"
    )


def _tokenize(text: str) -> list[str]:
    return re.findall(r"\w+", text.lower())


def _chunk_markdown(content: str, source: str, max_size: int = 900) -> list[dict]:
    """Split a markdown file into chunks by heading, respecting max_size."""
    result = []
    sections = re.split(r"\n(?=#{1,3} )", content)

    for section in sections:
        section = section.strip()
        if not section:
            continue

        lines = section.split("\n")
        title = lines[0].lstrip("#").strip() if lines else source

        if len(section) <= max_size:
            result.append({"text": section, "source": source, "title": title})
            continue

        # Section too long → split by paragraphs
        paragraphs = section.split("\n\n")
        current: list[str] = []
        current_len = 0

        for para in paragraphs:
            if current_len + len(para) > max_size and current:
                result.append({
                    "text": "\n\n".join(current),
                    "source": source,
                    "title": title,
                })
                current = [para]
                current_len = len(para)
            else:
                current.append(para)
                current_len += len(para)

        if current:
            result.append({
                "text": "\n\n".join(current),
                "source": source,
                "title": title,
            })

    return result


def build_index() -> int:
    global _bm25, _chunks

    docs_path = _find_docs_path()
    logger.info(f"Indexing documents from: {docs_path}")

    _chunks = []
    for md_file in sorted(docs_path.rglob("*.md")):
        try:
            content = md_file.read_text(encoding="utf-8")
            rel = str(md_file.relative_to(docs_path))
            _chunks.extend(_chunk_markdown(content, rel))
        except Exception as e:
            logger.warning(f"Skipping {md_file}: {e}")

    if not _chunks:
        logger.warning("No chunks indexed — check DOCS_PATH.")
        return 0

    tokenized = [_tokenize(c["text"]) for c in _chunks]
    _bm25 = BM25Okapi(tokenized)
    logger.info(f"Indexed {len(_chunks)} chunks from {len(list(docs_path.rglob('*.md')))} files")
    return len(_chunks)


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    build_index()
    yield


app = FastAPI(title="TFG Chatbot API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    title: str
    source: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/health")
def health():
    return {"status": "ok", "chunks": len(_chunks), "model": GROQ_MODEL}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Empty question")
    if _bm25 is None:
        raise HTTPException(status_code=503, detail="Index not ready yet")

    # BM25 retrieval — top 4 chunks
    scores = _bm25.get_scores(_tokenize(req.question))
    top_idx = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:4]
    top_chunks = [_chunks[i] for i in top_idx if scores[i] > 0]

    if not top_chunks:
        return ChatResponse(
            answer="No encontré información relevante en la documentación para esta pregunta.",
            sources=[],
        )

    context = "\n\n---\n\n".join(c["text"] for c in top_chunks)

    # Deduplicated sources
    seen: set[str] = set()
    sources: list[Source] = []
    for c in top_chunks:
        if c["source"] not in seen:
            seen.add(c["source"])
            sources.append(Source(title=c["title"], source=c["source"]))

    system_prompt = (
        "You are a helpful documentation assistant for an EVE-NG ethical pentesting lab project (TFG). "
        "Answer questions based ONLY on the provided documentation context. "
        "Be concise and technical. If the context does not contain enough information, say so clearly. "
        "Answer in the same language the user uses (Spanish or English). "
        "When referencing commands or config, quote them exactly from the context."
    )

    user_prompt = f"Documentation context:\n{context}\n\nQuestion: {req.question}"

    response = groq_client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        max_tokens=1024,
        temperature=0.1,
    )

    return ChatResponse(
        answer=response.choices[0].message.content,
        sources=sources,
    )


@app.post("/api/index")
def reindex():
    count = build_index()
    return {"indexed": count}
