"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export const StickyCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Reveal the sticky CTA only after scrolling past the fold (e.g. 500px)
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden animate-in slide-in-from-bottom-5 duration-200">
            <Link
                href="/contact"
                className="flex w-full items-center justify-center bg-black text-white py-5 font-bold uppercase tracking-widest text-sm shadow-2xl"
            >
                Soumettre un besoin technique
            </Link>
        </div>
    );
};
