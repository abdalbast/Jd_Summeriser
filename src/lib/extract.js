import { SKILL_SYNONYMS, normalise } from './skills.js';

export function extractTopSkills(jdText, seedSkills = []) {
  const jd = ' ' + normalise(jdText) + ' ';
  const evidence = {};
  const matched = [];
  const targets = seedSkills.length ? seedSkills : Object.keys(SKILL_SYNONYMS);
  targets.forEach(skill => {
    const syns = (SKILL_SYNONYMS[skill] || [skill.toLowerCase()]);
    let found = false;
    syns.forEach(term => {
      const esc = term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rx = new RegExp('\\b' + esc + '\\b', 'g');
      const hits = jd.match(rx);
      if (hits && hits.length) {
        found = true;
        if (!evidence[skill]) evidence[skill] = [];
        // crude snippet: take 60 chars around first match
        const idx = jd.indexOf(term);
        if (idx >= 0) {
          const start = Math.max(0, idx - 60);
          const end = Math.min(jd.length, idx + term.length + 60);
          evidence[skill].push(jd.slice(start, end).trim());
        }
      }
    });
    if (found) matched.push(skill);
  });
  return { matched, evidence };
}
