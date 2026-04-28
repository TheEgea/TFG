# App F — Objectives, Deliverables, and KPIs

This appendix complements Chapter  with the full deliverable specifications
per specific objective, the detailed per-category KPI tables, and the extended audience
analysis that frames the project's reuse potential.

## Deliverables by Specific Objective

### OE1: Design and Implement EVE-NG Labs

- 4 `.unl` topology files (Lab 1: implemented; Labs 2–4: planned)
- 8–12 optimised virtual machine images
- Technical configuration documentation for each lab

### OE2: Develop Automation Scripts

- Bash/Python utility scripts for common tasks (e.g.\ bridge configuration,
      ISO upload, node connectivity checks)
- Scripts documented with usage instructions in the repository

### OE3: Develop Structured Teaching Material

- Student lab guide PDF (student lab guide) per lab — task description, objectives,
      hints, and tools reference
- Instructor resolution guide PDF (instructor solution guide) per lab — full walkthrough,
      flag values, rubric (100 pts), and common errors
- Technical configuration reference per lab in the repository

### OE4: Validate Usability and Educational Effectiveness

- Pilot session report with timing and usability observations
- Post-session survey results (satisfaction, difficulty, clarity)
- List of improvements implemented based on pilot feedback

**Pilot note**: The pilot group comprises 4–5 individuals from the GEISI student
population, potentially including participants with documented learning difficulties
(e.g.\ dyslexia), to assess the effectiveness of the accessibility measures
incorporated in the lab documentation.

## Detailed KPI Tables

The following tables break down the consolidated KPIs from Table 
by category for reference.

### Technical Indicators

| **Metric** | **Objective** | **Measurement Method** |
| --- | --- | --- |
| Lab deployment time | ≤ 2 min | Automated timing |
| VM boot success rate | ≥ 95
    Full reset time | ≤ 30 s | Scripts with timestamps |
| Scenario reproducibility | 100\ |

### Educational Indicators

| **Metric** | **Objective** | **Measurement Method** |
| --- | --- | --- |
| Lab resolution time | 90–120 min | Time tracking during pilot |
| Lab completion (pilot) | All participants | Observation during pilot sessions |
| User satisfaction | ≥ 4/5 | Post-use survey |
| Key concept understanding | ≥ 80\ |

### Quality Indicators

| **Metric** | **Objective** | **Measurement Method** |
| --- | --- | --- |
| Documentation coverage | 100
    Critical errors | 0 | Exhaustive testing |
| EVE-NG version compatibility | 100
    Interface usability | ≥ 4/5 | UX heuristic evaluation |

## Extended Audience Analysis

### Secondary End Users

- **Cybersecurity Faculty**: Other teachers interested in reusing the material
      for related courses
- **Postgraduate Students**: Possible extensions of the material for advanced levels

### Potential Audience Beyond Tecnocampus

#### Internal Scope (Tecnocampus)

- Other courses related to cybersecurity
- Research projects in computer security
- Continuing education and professional certifications

#### External Scope

- Educational institutions with training programmes in cybersecurity
- Specialised vocational training centres
- Companies with internal security training programmes