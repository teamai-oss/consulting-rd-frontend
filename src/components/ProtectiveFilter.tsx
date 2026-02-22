import React from "react";
import Link from "next/link";

export const ProtectiveFilter: React.FC = () => {
    return (
        <section className="w-full bg-background border-b border-border py-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1440px]">
                {/* En-tête du bloc */}
                <div className="mb-20 max-w-4xl">
                    <span className="font-mono text-sm font-bold text-neutral-500 uppercase tracking-widest block mb-4">
            {`// DISPONIBILITÉ GARANTIE SOUS 48H`}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] tracking-tighter mb-8">
                        Parce que l&apos;urgence<br />
                        n&apos;excuse pas l&apos;incompétence.
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-foreground max-w-2xl leading-relaxed">
                        Nous avons transformé notre recrutement en un filtre de sécurité pour votre Bureau d&apos;Études. Accédez instantanément au Top 18% des ingénieurs francophones, testés sur vos outils.
                    </p>
                </div>

                {/* Grille des Process (Filtre Protecteur) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-border">
                    {/* Étape 1 */}
                    <div className="p-8 border-r border-b border-border flex flex-col justify-between h-full bg-background hover:bg-neutral-50 transition-colors duration-0">
                        <div>
                            <span className="font-mono text-xs font-bold text-neutral-400 block mb-6">ÉTAPE 01</span>
                            <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Le Crash Test Technique</h3>
                            <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                                Chaque candidat est évalué en conditions réelles sur Revit, Mensura ou AutoCAD par nos directeurs techniques.
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-border">
                            <span className="font-mono text-sm font-bold text-foreground bg-muted px-2 py-1 inline-block uppercase">
                                1 CANDIDAT SUR 2 ÉCARTÉ
                            </span>
                        </div>
                    </div>

                    {/* Étape 2 */}
                    <div className="p-8 border-r border-b border-border flex flex-col justify-between h-full bg-background hover:bg-neutral-50 transition-colors duration-0">
                        <div>
                            <span className="font-mono text-xs font-bold text-neutral-400 block mb-6">ÉTAPE 02</span>
                            <h3 className="text-xl font-black uppercase mb-4 tracking-tight">L&apos;Intelligence de Chantier</h3>
                            <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                                Des ingénieurs testés sur leur capacité à tenir une réunion de corps d&apos;état et gérer la pression des livrables.
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-border">
                            <span className="font-mono text-sm font-bold text-success bg-green-50 px-2 py-1 inline-block uppercase border border-success/30">
                                VALIDATION DRH BTP
                            </span>
                        </div>
                    </div>

                    {/* Étape 3 */}
                    <div className="p-8 border-r border-b border-border flex flex-col justify-between h-full bg-background hover:bg-neutral-50 transition-colors duration-0">
                        <div>
                            <span className="font-mono text-xs font-bold text-neutral-400 block mb-6">ÉTAPE 03</span>
                            <h3 className="text-xl font-black uppercase mb-4 tracking-tight">L&apos;Ingénierie Déportée</h3>
                            <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                                Onboarding technique sécurisé (VPN IPsec). Votre propriété intellectuelle est protégée sous le strict RGPD (UE).
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-border">
                            <span className="font-mono text-sm font-bold text-foreground bg-muted px-2 py-1 inline-block uppercase">
                                DÉPLOIEMENT : 1 HEURE
                            </span>
                        </div>
                    </div>

                    {/* Étape 4 */}
                    <div className="p-8 border-r border-b border-border flex flex-col justify-between h-full bg-black text-white transition-colors duration-0">
                        <div>
                            <span className="font-mono text-xs font-bold text-neutral-500 block mb-6">ÉTAPE 04</span>
                            <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Votre Shortlist Calibrée</h3>
                            <p className="text-sm text-neutral-300 font-medium leading-relaxed">
                                Zéro temps perdu en CVs inutiles. Nous vous présentons maximum 3 profils parfaitement adaptés à votre besoin.
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-neutral-800">
                            <span className="font-mono text-sm font-bold text-white border border-white px-2 py-1 inline-block uppercase">
                                ACCÈS AUX RAPPORTS
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer CTAs */}
                <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
                    <Link href="/contact" className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wide border-2 border-transparent hover:bg-transparent hover:text-black hover:border-black transition-colors duration-0 text-sm w-full sm:w-auto text-center">
                        Solliciter notre vivier
                    </Link>
                    <Link href="/methodologie" className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors">
                        Voir notre processus détaillé →
                    </Link>
                </div>
            </div>
        </section>
    );
};
