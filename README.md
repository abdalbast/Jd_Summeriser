# JD Skill Summariser

A lightweight, client-side web app that extracts and summarises top skills, tools, experience, education hints, and certifications from a job description (JD). Built with HTML5 + Tailwind CSS + vanilla JS. Deployed via GitHub Pages.

## Live Demo
- App: https://abdalbast.github.io/Jd_Summeriser/
- Repo: https://github.com/abdalbast/Jd_Summeriser

## Features
- Summarises top skills with counts, ranked top 10
- Rich taxonomy with synonyms across Programming, Data/ML, Cloud/DevOps, Databases, Methodologies, Soft Skills, Certifications, Security, Education
- Extracts meta: seniority, years of experience, degree subjects (best-effort)
- Category chips for quick scanning
- Robust HTML → text parsing (DOMParser) for pasted HTML/JD URLs
- Custom terms: add your own comma-separated keywords to count
- File upload: paste `.txt` or `.html` job posts
- Export JSON of the full summary
- Export CSV of the top skills
- Copy top skills as comma-separated text
- Dark mode with system preference and toggle
- No backend; everything runs in the browser

## Quick Start
1. Open the live app (link above) or double-click `index.html` locally.
2. Paste a job description into the text area, or:
   - Enter a JD URL and click Fetch (CORS permitting), or
   - Upload a `.txt`/`.html` file.
3. (Optional) Add custom terms (comma-separated) such as `GenAI, LLM, ETL`.
4. Click “Summarise”.
5. Use the buttons to copy/export JSON/CSV or copy skills as comma-separated.
## How It Works
- Normalises text and counts mentions of canonical skills via synonym lists.
- Groups counts by category and sorts to surface the top 10.
- Attempts to recognise seniority, years of experience and degree subjects using regex-based heuristics.
- Uses the browser’s DOMParser for safe HTML-to-text extraction when fetching URLs or uploading HTML.

## Tips for Best Results
- Prefer pasting the text of the JD directly.
- Some sites block cross-origin requests; use copy-paste if Fetch fails.
- Add domain-specific keywords in Custom terms (e.g., `NLP, LLMOps`).
- The taxonomy is extensible: update the `TAXONOMY` object in `index.html`.

## Local Development
- Requirements: a modern browser. No build step required.
- Open `index.html` in your browser. Tailwind is loaded via CDN.
- Edit `index.html` to modify UI or the taxonomy.

## Deployment
- This repo is set up for GitHub Pages.
- Pages configuration:
  - Source: Branch `main`, folder `/`.
  - Your site will be available at `https://<username>.github.io/Jd_Summeriser/`.

## Accessibility & UX
- Dark mode respects system preference with a manual toggle.
- Buttons have clear labels and hover states.
- Uses semantic HTML and high-contrast colours in dark mode.

## Roadmap Ideas
- Add skill weighting by context (requirements vs nice-to-have)
- Highlight required vs optional skills
- Inline editing of taxonomy and saving to localStorage
- PDF upload (via client-side PDF parsing)
- Share image (Open Graph) asset

## Licence
MIT

## CV Matching (LinkedIn-style inspiration)
- Paste your CV text into the CV box or upload a `.txt`/`.pdf` file (PDF text is extracted client-side via PDF.js).
- Click “Match JD ↔ CV” or simply run Summarise with a CV present to compute a match.
- The match score is weighted by the JD’s top skills emphasis, with bonuses for:
  - Matching seniority level
  - Meeting/exceeding required years of experience
  - Holding relevant certifications (from the taxonomy)
- The result shows a percentage bar, matched skills and missing gaps so you know what to improve.

### Notes
- PDF extraction is text-based and may miss complex layouts; for best accuracy, paste plain text.
- No data leaves your browser.
- CV uploads: now supports `.txt`, `.pdf` (PDF.js text extraction), and `.docx` (Mammoth.js) entirely in the browser. Prefer text for highest accuracy.
