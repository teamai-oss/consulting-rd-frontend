import { Header } from "@/components/Header";
import { ExpertiseGrid } from "@/components/ExpertiseGrid";
import { ProtectiveFilter } from "@/components/ProtectiveFilter";
import { StickyCTA } from "@/components/StickyCTA";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";

// Optimization: Wrapper Payload with Next.js Data Cache to prevent Vercel/Neon cold starts
const getCachedHomePage = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "home" },
        status: { equals: "published" },
      },
      depth: 1,
    });
    return result.docs[0];
  },
  ["home-page-data"],
  { revalidate: 3600, tags: ["pages-home"] }
);

export default async function Home() {
  const homePage = await getCachedHomePage();
  const pageTitle = homePage?.title || "LE TOP 3%\nDES INGÉNIEURS.";

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Section (Above the fold) */}
      <section className="w-full flex-grow flex flex-col justify-center px-6 md:px-12 py-24 max-w-[1440px] mx-auto min-h-[60vh]">
        <span className="font-mono text-sm md:text-base font-bold text-neutral-500 mb-6 uppercase tracking-widest">
          {`// INGÉNIERIE DÉLÉGUÉE`}
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black uppercase leading-[0.85] tracking-tighter mb-12 whitespace-pre-line">
          {pageTitle}
        </h1>

        {/* Inline B2B Form (Placeholder brutaliste) */}
        <div className="max-w-2xl mt-8">
          <p className="text-xl md:text-2xl font-medium mb-8">
            Délégation de compétences CVC, VRD et Structure. Opérationnels sous 48h sur vos projets BTP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 border-b-4 border-black pb-2 focus-within:border-success transition-colors duration-0">
            <input
              type="text"
              placeholder="VOTRE RECHERCHE (EX: INGÉNIEUR CVC REVIT)"
              className="w-full bg-transparent outline-none font-mono text-sm uppercase placeholder:text-neutral-400 py-2 placeholder:font-bold"
            />
            <button className="font-bold uppercase tracking-wider text-sm px-4 whitespace-nowrap">
              Rechercher →
            </button>
          </div>
        </div>
      </section>

      <ExpertiseGrid />
      <ProtectiveFilter />
      <StickyCTA />

    </main>
  );
}
