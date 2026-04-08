-- Lua filter: convert MkDocs admonitions to LaTeX environments
-- Uses string.char(92) for backslash to avoid escape sequence issues

local BS = string.char(92)  -- backslash

local type_env = {
    note     = "admnote",
    info     = "adminfo",
    warning  = "admwarning",
    caution  = "admwarning",
    attention= "admwarning",
    danger   = "admdanger",
    error    = "admdanger",
    tip      = "admtip",
    hint     = "admtip",
    success  = "admsuccess",
    check    = "admsuccess",
    done     = "admsuccess",
    example  = "admexample",
    abstract = "admabstract",
    summary  = "admabstract",
    question = "admquestion",
    help     = "admquestion",
    faq      = "admquestion",
    failure  = "admfailure",
    fail     = "admfailure",
    missing  = "admfailure",
    bug      = "admbug",
}

-- Escape LaTeX special characters in a plain string
local function latex_escape(s)
    s = s:gsub("%%", BS .. "%%")
    s = s:gsub("{",  BS .. "{")
    s = s:gsub("}",  BS .. "}")
    s = s:gsub("_",  BS .. "_")
    s = s:gsub("#",  BS .. "#")
    s = s:gsub("&",  BS .. "&")
    s = s:gsub("%$", BS .. "%$")
    s = s:gsub("%^", BS .. "textasciicircum{}")
    s = s:gsub("~",  BS .. "textasciitilde{}")
    return s
end

function Div(el)
    local is_admonition = false
    local admon_type = "note"

    for _, cls in ipairs(el.classes) do
        if cls == "admonition" then
            is_admonition = true
        elseif type_env[cls] then
            admon_type = cls
        end
    end

    if not is_admonition then return nil end

    -- First Para is the title (stripped from the body)
    local title = ""
    local body_blocks = {}
    local skip_first = false

    if #el.content > 0 and el.content[1].t == "Para" then
        title = latex_escape(pandoc.utils.stringify(el.content[1]))
        skip_first = true
    end

    for i, block in ipairs(el.content) do
        if not (skip_first and i == 1) then
            table.insert(body_blocks, block)
        end
    end

    if #body_blocks == 0 then
        body_blocks = el.content
    end

    local env = type_env[admon_type] or "admnote"

    if FORMAT == "latex" then
        local begin_str = BS .. "begin{" .. env .. "}{" .. title .. "}" .. "\n"
        local end_str   = BS .. "end{" .. env .. "}" .. "\n"

        local result = {pandoc.RawBlock("latex", begin_str)}
        for _, b in ipairs(body_blocks) do
            table.insert(result, b)
        end
        table.insert(result, pandoc.RawBlock("latex", end_str))
        return result
    end

    return nil
end
