import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";

interface ExpertiseItem {
    id: string | number;
    title: string;
    slug: string;
    softwares: { softwareName: string }[];
}

const fallbackExpertises: ExpertiseItem[] = [
    {
        id: "01",
        title: "CVC & PLOMBERIE",
        slug: "cvc",
        softwares: [{ softwareName: "Revit MEP" }, { softwareName: "Plancal Nova" }, { softwareName: "AutoCAD" }],
    },
    {
        id: "02",
        title: "ÉLECTRICITÉ CFA/CFO",
        slug: "electricite",
        softwares: [{ softwareName: "Caneco BT/HT" }, { softwareName: "Dialux" }, { softwareName: "Revit" }],
    },
    {
        id: "03",
        title: "STRUCTURE & BÂTIMENT",
        slug: "structure",
        softwares: [{ softwareName: "Robot Structural Analysis" }, { softwareName: "Tekla" }, { softwareName: "Advance Design" }],
    },
    {
        id: "04",
        title: "VRD & INFRASTRUCTURE",
        slug: "vrd",
        softwares: [{ softwareName: "Mensura" }, { softwareName: "Covadis" }, { softwareName: "Civil 3D" }],
    },
];

const getCachedExpertises = unstable_cache(
    async (): Promise<ExpertiseItem[]> => {
        try {
            const payload = await getPayload({ config: configPromise });
            const result = await payload.find({
                collection: "expertises",
                where: { status: { equals: "published" } },
                sort: "title",
                limit: 20,
            });
            if (result.docs.length > 0) {
                return result.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.title,
                    slug: doc.slug,
                    softwares: (doc.softwares as { softwareName: string }[]) || [],
                }));
            }
        } catch {
            // Fallback silently if DB unavailable
        }
        return fallbackExpertises;
    },
    ["expertises-grid"],
    { revalidate: 3600, tags: ["expertises-list"] }
);

export const ExpertiseGrid: React.FC = async () => {
    const expertises = await getCachedExpertises();

    return (
        <section className="w-full border-b border-border bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                {expertises.map((item, index) => (
                    <Link
                        key={item.id}
                        href={`/expertises/${item.slug}`}
                        className="group relative flex flex-col justify-between p-8 min-h-[320px] transition-colors duration-0 hover:bg-black hover:text-white cursor-pointer"
                    >
                        <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-neutral-500">
                            {`// NO.${String(index + 1).padStart(2, "0")}`}
                        </span>

                        <div className="mt-8">
                            <h3 className="text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tighter mb-6">
                                {item.title}
                            </h3>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                <span className="block font-mono text-xs uppercase mb-3 text-neutral-400">
                                    Maîtrise Logicielle :
                                </span>
                                <ul className="flex flex-wrap gap-2">
                                    {item.softwares.map((s) => (
                                        <li
                                            key={s.softwareName}
                                            className="border border-neutral-700 bg-neutral-900 px-2 py-1 font-mono text-[10px] text-neutral-300 uppercase"
                                        >
                                            {s.softwareName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-150">
                            <span className="font-mono text-xl">&rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
