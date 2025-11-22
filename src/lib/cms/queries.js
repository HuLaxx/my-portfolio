import groq from "groq";

export const projectsQuery = groq`
  *[_type == "project" && defined(year) && defined(client) && defined(role)]
  | order(year desc) {
    "id": coalesce(_id, client + year),
    client,
    role,
    year
  }
`;

export const resumeQuery = groq`
  *[_type == "resume" && defined(knowledgeBase)][0]{
    label,
    title,
    summary,
    neuralSummary,
    knowledgeBase
  }
`;

export const stackBlocksQuery = groq`
  *[_type == "stackComparison"] | order(order asc) {
    "id": slug.current,
    title,
    caption,
    highlights
  }
`;
