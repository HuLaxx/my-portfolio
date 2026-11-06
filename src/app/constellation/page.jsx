import ConstellationClient from "./ConstellationClient";

export const metadata = {
  title: "Project Constellation | Rahul Khanke",
  description:
    "Explore the engineering behind Sentinance, GraphGuard, FleetFlow, and Shiftify in an interactive constellation of real projects.",
};

const repositories = ["Sentinance", "GraphGuard", "FleetFlow", "Shiftify"];

async function getRepositorySignals() {
  const data = await Promise.all(
    repositories.map(async (name) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/HuLaxx/${encodeURIComponent(name)}`,
          {
            headers: { Accept: "application/vnd.github+json" },
            next: { revalidate: 3600 },
          }
        );
        if (!response.ok) return [name.toLowerCase(), null];
        const repo = await response.json();
        return [
          name.toLowerCase(),
          {
            language: repo.language || null,
            pushedAt: repo.pushed_at ? repo.pushed_at.slice(0, 10) : null,
            url: repo.html_url || `https://github.com/HuLaxx/${name}`,
          },
        ];
      } catch {
        return [name.toLowerCase(), null];
      }
    })
  );
  return Object.fromEntries(data);
}

export default async function ConstellationPage() {
  const signals = await getRepositorySignals();

  return <ConstellationClient signals={signals} />;
}
