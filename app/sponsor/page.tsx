"use client";

import Link from "next/link";
import { ArrowLeft, Menu, Search, Filter, Home, DollarSign, User, LogOut, X, Box } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock Data
const featuredArtisans = [
    {
        id: "1",
        name: "Elena Vance",
        specialization: "Pottery, Glasswork",
        image: "https://images.unsplash.com/photo-1542206391-78c487ac2f39?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2",
        name: "Marcus Stone",
        specialization: "Woodwork, Carving",
        image: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?auto=format&fit=crop&q=80&w=800",
    },
];

const categories = [
    { name: "Textiles", icon: "✂️" },
    { name: "Woodwork", icon: "🔨" },
    { name: "Paintings", icon: "🎨" },
    { name: "Pottery", icon: "🏺" },
];

const discoveryArtisans = [
    {
        id: "3",
        name: "Aria Wu",
        specialization: "Textiles",
        image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2", // Reuse for demo
        name: "Marcus Stone",
        specialization: "Woodwork",
        image: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "4",
        name: "Leo Rivera",
        specialization: "Paintings",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    },
];

export default function SponsorDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-24 relative overflow-x-hidden">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={cn(
                "fixed top-0 left-0 h-full w-[300px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Box className="w-6 h-6 text-[#FF5A5F]" />
                        <span className="font-serif font-bold text-xl text-[#1C1C1C]">Artistry Havens</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Sidebar Nav Items */}
                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem href="/sponsor" icon={<Home className="w-5 h-5" />} label="Home" active />
                    <SidebarItem href="/sponsor/revenue" icon={<DollarSign className="w-5 h-5" />} label="Revenue" />
                    <SidebarItem href="#" icon={<User className="w-5 h-5" />} label="Account" />
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-100 mb-8">
                    <button className="flex items-center gap-3 w-full p-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all group">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>

                    <div className="mt-6 flex items-center gap-3 px-3">
                        <div className="w-10 h-10 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center font-serif text-sm">N</div>
                        <div className="flex-1">
                            <Box className="w-6 h-6 text-gray-400 ml-auto" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#FDFBF7]/90 backdrop-blur-md">
                <div className="px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <Menu className="w-6 h-6 text-[#1C1C1C]" />
                    </button>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-black/5 rounded-full text-[#1C1C1C]">
                            <Search className="w-6 h-6" />
                        </button>
                        <button className="p-2 hover:bg-black/5 rounded-full text-[#1C1C1C]">
                            <Filter className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-10">

                {/* Welcome Section */}
                <section className="space-y-2 mt-4">
                    <h1 className="text-3xl font-serif font-bold text-[#1C1C1C] leading-tight">
                        Welcome, Sponsor!
                    </h1>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        Invest in culture, empower creators, and share in the success of India's finest artisans.
                    </p>
                </section>

                {/* Featured Artisans Carousel */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-serif font-bold text-[#1C1C1C]">
                            Featured Artisans
                        </h2>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
                        {featuredArtisans.map((artisan) => (
                            <div key={artisan.id} className="snap-center shrink-0 w-[280px] bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                                <div className="h-[200px] relative">
                                    <img
                                        src={artisan.image}
                                        alt={artisan.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
                                        <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
                                            <ArrowLeft className="w-4 h-4 text-[#1C1C1C]" />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm rotate-180">
                                            <ArrowLeft className="w-4 h-4 text-[#1C1C1C]" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                        <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[#1C1C1C] truncate">{artisan.name}</h3>
                                        <p className="text-xs text-[#6B6B6B] truncate">{artisan.specialization}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Discover Artisans Section (Mixed with Categories) */}
                <section className="space-y-8">
                    <h2 className="text-xl font-serif font-bold text-[#1C1C1C]">
                        Discover Artisans to Sponsor
                    </h2>

                    {discoveryArtisans.map((artisan, index) => {
                        // Match category icon loosely based on data for demo
                        const cat = categories.find(c => artisan.specialization.includes(c.name)) || categories[0];
                        return (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl text-[#FF5A5F]">{cat.icon}</span>
                                    <h3 className="text-lg font-serif font-bold text-[#1C1C1C]">{cat.name}</h3>
                                </div>

                                <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-4">
                                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                                        <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[#1C1C1C]">{artisan.name}</h3>
                                        <p className="text-xs text-[#6B6B6B]">specializes in {artisan.specialization}</p>
                                    </div>
                                    <Link
                                        href={`/sponsor/artisan/${artisan.id}`}
                                        className="block w-full py-3 bg-[#EFEFEF] hover:bg-[#E5E5E5] text-[#1C1C1C] text-center rounded-lg text-sm font-medium transition-colors"
                                    >
                                        View Artisan
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </section>

            </main>
        </div>
    );
}

function SidebarItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 w-full p-3 text-left rounded-xl transition-all group",
                active
                    ? "bg-[#FF5A5F]/10 text-[#FF5A5F]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#1C1C1C]"
            )}
        >
            <div className={cn("transition-colors", active ? "text-[#FF5A5F]" : "text-gray-400 group-hover:text-[#1C1C1C]")}>
                {icon}
            </div>
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
