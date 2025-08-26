// Fallback using docx library to create a simple, clean document
export async function generateDirectDocx(suggestions) {
  // Fallback without docx library: simple .doc file (Word opens) via HTML MIME
  const esc = s => String(s||'').replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
  <h1>Profile</h1>
  <p>${(suggestions.profile||[]).map(esc).join('<br/>')}</p>
  <h1>Key Skills</h1>
  <p>${esc((suggestions.keySkills||[]).join(', '))}</p>
  ${(suggestions.experience||[]).map(e=>`<h1>${esc(e.role)}</h1><ul>${(e.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul>`).join('')}
  <h1>Education</h1>
  <p>${(suggestions.education||[]).map(esc).join('<br/>')}</p>
  <h1>Additional</h1>
  <p>${(suggestions.additional||[]).map(esc).join('<br/>')}</p>
  </body></html>`;
  return new Blob([html], { type: 'application/msword' });
}
