"use client";

import { ArrowLeft, Box } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const transactions = [
    {
        id: 1,
        artisan: "Aria Wu",
        image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=200",
        share: "15%",
        amount: "₹225.00",
    },
    {
        id: 2,
        artisan: "Marcus Stone",
        image: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?auto=format&fit=crop&q=80&w=200",
        share: "20%",
        amount: "₹180.00",
    },
];

export default function RevenuePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-6 space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <Box className="w-5 h-5 text-[#1C1C1C] rotate-90" /> {/* Using Box as a placeholder for the icon in screenshot if needed, or stick to ArrowLeft/Menu logic. Screenshot has a unique icon top left. Using Box for now matching sidebar branding */}
                </button>
            </header>

            {/* Title Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold text-[#1C1C1C]">
                    Revenue Generated
                </h1>
                <p className="text-sm text-[#6B6B6B]">
                    Track your sponsorship returns.
                </p>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-8">
                <div className="space-y-1">
                    <h2 className="text-xl font-serif font-bold text-[#1C1C1C]">
                        Shared Revenue
                    </h2>
                    <p className="text-sm text-[#6B6B6B]">
                        Profit shared with artisans from successful sales.
                    </p>
                </div>

                {/* Table/List */}
                <div className="space-y-6">
                    {/* Headers */}
                    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 text-sm text-[#6B6B6B] border-b border-dashed border-gray-200 pb-4">
                        <div className="w-16">Product</div> {/* Placeholder width for image col */}
                        <div>Artisan</div>
                        <div className="text-center">Artisan's Share</div>
                        <div className="text-right">Shared Amount</div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-6">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                                {/* Image */}
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                    <img src={tx.image} alt={tx.artisan} className="w-full h-full object-cover" />
                                </div>

                                {/* Artisan Name */}
                                <div className="font-serif font-medium text-[#1C1C1C] text-lg leading-tight">
                                    {tx.artisan.split(' ').map((part, i) => (
                                        <span key={i} className="block">{part}</span>
                                    ))}
                                </div>

                                {/* Share Pill */}
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#f0eee6] text-sm font-medium text-[#1C1C1C]">
                                        {tx.share}
                                    </span>
                                </div>

                                {/* Amount */}
                                <div className="text-right font-medium text-[#1C1C1C]">
                                    {tx.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
