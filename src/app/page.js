
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RagShowcase } from "@/components/RagShowcase";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Work";
import { getPortfolioContent } from "@/lib/cms/content-service";
import { ExploreRoles } from "@/components/ExploreRoles";

export const runtime = "edge";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)]">

      <Hero resume={content.resume} />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12 flex flex-col gap-10 md:gap-14">
        <ExploreRoles />
        <Experience experience={content.resume.experience} />
        <Projects projects={content.projects} caseStudies={content.caseStudies} />
        <Education resume={content.resume} />
      </main>
      <Footer />
    </div>
  );
}
