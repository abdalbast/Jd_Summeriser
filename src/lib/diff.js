export function simpleDiff(before, after) {
  if (!before && !after) return '';
  const b = (before || '').split(/\s+/);
  const a = (after || '').split(/\s+/);
  const out = [];
  const len = Math.max(b.length, a.length);
  for (let i=0;i<len;i++) {
    if (b[i] === a[i]) out.push(b[i] || '');
    else {
      if (b[i]) out.push(`<del>${b[i]}</del>`);
      if (a[i]) out.push(`<mark>${a[i]}</mark>`);
    }
  }
  return out.join(' ').replace(/\s+<\/del>/g,'</del> ').replace(/\s+<mark>/g,' <mark>');
}
