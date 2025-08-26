import { extractTopSkills, } from './extract.js';
import { normalise } from './skills.js';

export function generateSuggestions({ jdText, targetSkills, userCvMeta = {} }) {
  const seed = targetSkills && targetSkills.length ? targetSkills : ["Snowflake","Scala","Problem solving","Leadership"];
  const { matched, evidence } = extractTopSkills(jdText || '', seed);
  const emphasise = new Set(matched);

  const profile = [];
  if (emphasise.has('Snowflake')) profile.push('Leveraged SQL skills and cloud data-warehouse concepts transferable to Snowflake (staging, COPY, RBAC).');
  if (emphasise.has('Scala')) profile.push('Developing Scala for data pipelines and Spark-based transformations; comfortable with typed FP basics.');
  if (emphasise.has('Problem solving')) profile.push('Applied structured root-cause analysis to reduce recurrent incidents and optimise processes.');
  if (emphasise.has('Leadership')) profile.push('Led cross-functional sessions; mentored peers via SOPs and walkthroughs.');
  if (!profile.length) profile.push('Strengthened data engineering practice with transferable skills aligned to role expectations.');

  const keySkills = Array.from(new Set(matched.concat(seed))).slice(0, 12);

  const experience = (userCvMeta.roles || []).map(role => ({ role, bullets: [] }));
  if (!experience.length) experience.push({ role: 'Recent Experience', bullets: [] });
  experience.forEach(entry => {
    if (emphasise.has('Snowflake')) entry.bullets.push('Designed pipelines structured to scale on Snowflake (staging/COPY, RBAC).');
    if (emphasise.has('Scala')) entry.bullets.push('Built Spark/Scala transformations and testable typed dataflows.');
    if (emphasise.has('Problem solving')) entry.bullets.push('Performed root-cause analysis and triage to prevent repeat incidents.');
    if (emphasise.has('Leadership')) entry.bullets.push('Facilitated cross-functional sessions; mentored through SOPs/walkthroughs.');
  });

  const education = emphasise.has('Snowflake') ? ['Completed self-directed training on cloud data-warehouse patterns.'] : [];
  const additional = [];

  return { profile, keySkills, experience, education, additional, evidence };
}
