import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
    return (
        <header className="w-full border-b border-border bg-background sticky top-0 z-40 backdrop-blur-sm bg-background/95">
            <div className="mx-auto flex w-full max-w-[1440px] items-stretch justify-between">

                {/* SAFE ZONE: Le Logo isolé dans un espace optique blanc démesuré */}
                <div className="flex bg-white items-center justify-center px-12 py-10 border-r border-border md:px-24">
                    <Link href="/" className="group" aria-label="Retour à l'accueil">
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-3xl font-black tracking-tighter text-black uppercase leading-none">
                                CONSULTING R&D
                            </span>
                            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                                EST. 2008 // INGÉNIERIE DÉLÉGUÉE
                            </span>
                        </div>
                    </Link>
                </div>

                {/* NAVIGATION: Brutaliste & Épurée */}
                <nav className="hidden lg:flex items-center">
                    <ul className="flex h-full text-sm font-semibold tracking-wide uppercase">
                        <li className="h-full border-l border-border hover:bg-black hover:text-white transition-colors duration-0">
                            <Link href="/expertises" className="flex h-full w-full items-center px-8">
                                Domaines d&apos;Excellence
                            </Link>
                        </li>
                        <li className="h-full border-l border-border hover:bg-black hover:text-white transition-colors duration-0">
                            <Link href="/candidats" className="flex h-full w-full items-center px-8">
                                Parcours Ingénieur
                            </Link>
                        </li>
                        <li className="h-full border-l border-border bg-black text-white hover:bg-neutral-800 transition-colors duration-0">
                            <Link href="/contact" className="flex h-full w-full items-center px-8">
                                Soumettre un besoin
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* MOBILE MENU TOGGLE (Placeholder) */}
                <div className="flex lg:hidden items-center justify-center px-8 border-l border-border hover:bg-black hover:text-white cursor-pointer transition-colors duration-0">
                    <span className="font-mono text-sm font-bold uppercase">MENU</span>
                </div>

            </div>
        </header>
    );
};
