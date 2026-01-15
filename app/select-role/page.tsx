"use client";

import Link from "next/link";
import { Palette, ShoppingBag, Heart } from "lucide-react";

export default function SelectRole() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-8 bg-[#FDFBF7]">
            <div className="space-y-4 text-center max-w-sm">
                <div className="mx-auto w-12 h-12 text-[#FF5A5F] mb-6">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full"
                    >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold font-serif text-[#1C1C1C]">
                    Welcome to Artistry Havens
                </h1>
                <p className="text-base text-[#6B6B6B]">
                    How would you like to join our community?
                </p>
            </div>

            <div className="w-full max-w-xs space-y-4">
                <RoleCard
                    href="/auth?role=artisan"
                    icon={<Palette className="w-8 h-8 text-[#FF5A5F]" />}
                    title="Artisan"
                    description="Showcase your creations, connect with buyers."
                />
                <RoleCard
                    href="/auth?role=buyer"
                    icon={<ShoppingBag className="w-8 h-8 text-[#FF5A5F]" />}
                    title="Buyer"
                    description="Discover and purchase unique handmade goods."
                />
                <RoleCard
                    href="/auth?role=sponsor"
                    icon={<Heart className="w-8 h-8 text-[#FF5A5F]" />}
                    title="Sponsor"
                    description="Support artisans and the creative community."
                />
            </div>
        </div>
    );
}

function RoleCard({
    href,
    icon,
    title,
    description,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent hover:border-[#FF5A5F]/20 transition-all active:scale-95"
        >
            <div className="shrink-0 mt-1">{icon}</div>
            <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#1C1C1C]">{title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{description}</p>
            </div>
        </Link>
    );
}
