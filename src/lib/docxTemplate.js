// Template fill with docxtemplater (expects global Docxtemplater & PizZip)
export async function generateFromTemplate(file, data) {
  const arrayBuffer = await file.arrayBuffer();
  const zip = new window.PizZip(arrayBuffer);
  const doc = new window.docxtemplater().loadZip(zip);
  doc.setData(data);
  try { doc.render(); } catch (e) { throw new Error('Template render error: ' + (e.message||'')); }
  const out = doc.getZip().generate({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  return out;
}
