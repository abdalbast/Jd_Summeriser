// Minimal fallback using a simple text blob to .docx mime (placeholder)
export async function generateDirectDocx(suggestions) {
  const parts = [];
  parts.push('# Profile\n' + (suggestions.profile || []).join('\n'));
  parts.push('\n# Key Skills\n' + (suggestions.keySkills || []).join(', '));
  (suggestions.experience || []).forEach(e => {
    parts.push(`\n# ${e.role}\n- ` + (e.bullets || []).join('\n- '));
  });
  parts.push('\n# Education\n' + (suggestions.education || []).join('\n'));
  parts.push('\n# Additional\n' + (suggestions.additional || []).join('\n'));
  const text = parts.join('\n');
  return new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}
