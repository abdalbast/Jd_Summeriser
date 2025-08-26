export const SKILL_SYNONYMS = {
  Snowflake: ["snowflake", "snowflake sql", "warehouse", "staging", "copy", "rbac"],
  Scala: ["scala", "spark/scala", "sbt", "akka", "typed fp"],
  "Problem solving": ["problem solving", "root cause", "rca", "triage", "analytical"],
  Leadership: ["leadership", "mentoring", "stakeholder", "standups", "coach"],
};

export function normalise(text) {
  return (text || "")
    .toLowerCase()
    .replace(/\u2013|\u2014/g, '-')
    .replace(/[^a-z0-9+.#\/\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
