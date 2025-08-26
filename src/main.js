import { extractTopSkills } from './lib/extract.js';
import { generateSuggestions } from './lib/cvSuggester.js';
import { generateFromTemplate } from './lib/docxTemplate.js';
import { generateDirectDocx } from './lib/docxDirect.js';

export async function fetchReadable(url) {
  const u = new URL(url);
  const base = u.host + u.pathname + (u.search||'');
  const tries = [`https://r.jina.ai/http://${base}`, `https://r.jina.ai/https://${base}`];
  for (const t of tries) {
    try { const r = await fetch(t); if (r.ok) return await r.text(); } catch {}
  }
  throw new Error('Blocked. Please paste the text.');
}

export async function buildSuggestionsLLM(proxyUrl, jdText, skills, userCvMeta) {
  const r = await fetch(proxyUrl, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ jdText, targetSkills: skills, userCvMeta }) });
  if (!r.ok) throw new Error('Proxy failed');
  const data = await r.json();
  return { llmText: data.text };
}

export function buildSuggestions(jdText, skills, userCvMeta) {
  return generateSuggestions({ jdText, targetSkills: skills, userCvMeta });
}

export async function downloadDocx({ suggestions, templateFile, filename }) {
  const name = filename || 'Abdalbast_Khdhir_CV_Tailored.docx';
  let blob;
  if (templateFile) blob = await generateFromTemplate(templateFile, suggestions);
  else blob = await generateDirectDocx(suggestions);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}
