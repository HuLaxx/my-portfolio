import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { RagShowcase } from "@/components/RagShowcase";
import { Work } from "@/components/Work";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { getPortfolioContent } from "@/lib/cms/content-service";
import { MobileDock } from "@/components/MobileDock";
import { ExploreRoles } from "@/components/ExploreRoles";

export const runtime = "edge";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)]">
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12 flex flex-col gap-24 md:gap-32 [mask-image:linear-gradient(to_bottom,transparent_0%,black_100px)]">
        <Hero resume={content.resume} />
        <ExploreRoles />
        <Experience experience={content.resume.experience} />
        <Work projects={content.projects} caseStudies={content.caseStudies} />
        <Education resume={content.resume} />
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
}
