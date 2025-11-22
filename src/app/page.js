import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { StackComparison } from "@/components/StackComparison";
import { RagShowcase } from "@/components/RagShowcase";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Work } from "@/components/Work";
import { getPortfolioContent } from "@/lib/cms/content-service";
import { MobileDock } from "@/components/MobileDock";
import { ScrollProgress } from "@/components/ScrollProgress";

export const runtime = "edge";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)]">
      <ScrollProgress />
      <ThreeBackground />
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12 flex flex-col gap-24 md:gap-32">
        <Hero resume={content.resume} />
        <RagShowcase resume={content.resume} />
        <Work projects={content.projects} caseStudies={content.caseStudies} />
        <StackComparison stackComparisons={content.stackComparisons} />
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
}
