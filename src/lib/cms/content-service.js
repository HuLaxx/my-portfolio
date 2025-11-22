import { cache } from "react";
import { z } from "zod";

import { fallbackProjects, fallbackResume, fallbackStackComparisons, fallbackCaseStudies, fallbackRoles } from "@/data/fallbackContent";
import { getSanityClient, hasSanityConfig } from "./client";
import { projectsQuery, resumeQuery, stackBlocksQuery } from "./queries";

const projectSchema = z.object({
  year: z.union([z.string(), z.number()]).transform((value) => value.toString()),
  client: z.string(),
  role: z.string(),
});

const resumeSchema = z.object({
  label: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  neuralSummary: z.string().optional(),
  knowledgeBase: z.string(),
});

const stackSchema = z.object({
  id: z.string(),
  title: z.string(),
  caption: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});

const fallbackContent = {
  projects: fallbackProjects,
  resume: fallbackResume,
  stackComparisons: fallbackStackComparisons,
  caseStudies: fallbackCaseStudies,
  roles: fallbackRoles,
};

export const getPortfolioContent = cache(async () => {
  if (!hasSanityConfig) {
    return fallbackContent;
  }

  try {
    const client = getSanityClient();
    if (!client) return fallbackContent;

    const [projectsRaw, resumeRaw, stackRaw] = await Promise.all([
      client.fetch(projectsQuery),
      client.fetch(resumeQuery),
      client.fetch(stackBlocksQuery),
    ]);

    const projects =
      projectSchema.array().safeParse(projectsRaw).data ?? fallbackProjects;
    const resume =
      resumeSchema.safeParse(resumeRaw).data ?? fallbackResume;
    const stackComparisons =
      stackSchema.array().safeParse(stackRaw).data ?? fallbackStackComparisons;

    return {
      projects: projects.length ? projects : fallbackProjects,
      resume: { ...fallbackResume, ...resume },
      stackComparisons: stackComparisons.length
        ? stackComparisons
        : fallbackStackComparisons,
      caseStudies: fallbackCaseStudies,
    };
  } catch (error) {
    console.error("Sanity content fetch failed:", error);
    return fallbackContent;
  }
});

export async function getKnowledgeBase() {
  const { resume } = await getPortfolioContent();
  return resume.knowledgeBase ?? fallbackResume.knowledgeBase;
}

export async function getCaseStudy(slug) {
  const { caseStudies } = await getPortfolioContent();
  return caseStudies.find((study) => study.slug === slug);
}
