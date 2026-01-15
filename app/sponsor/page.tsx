import Link from "next/link";
import { ArrowLeft, Star, Heart, TrendingUp } from "lucide-react";

// Mock Data
const featuredArtisans = [
    {
        id: "1",
        name: "Aarav Patel",
        specialization: "Hand-Block Printing",
        image: "https://images.unsplash.com/photo-1542206391-78c487ac2f39?auto=format&fit=crop&q=80&w=800",
        description: "Master of Ajrakh printing with natural dyes.",
    },
    {
        id: "2",
        name: "Mei Lin",
        specialization: "Ceramic Pottery",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800",
        description: "Contemporary ceramics fusing traditional techniques.",
    },
];

const categories = [
    { name: "Textiles", count: 120 },
    { name: "Pottery", count: 85 },
    { name: "Woodwork", count: 64 },
    { name: "Jewelry", count: 92 },
    { name: "Metal Art", count: 45 },
    { name: "Glass", count: 30 },
];

const allArtisans = [
    ...featuredArtisans,
    {
        id: "3",
        name: "Elena Rodriguez",
        specialization: "Silver Jewelry",
        image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800",
        description: "Handcrafted silver jewelry inspired by nature.",
    },
    {
        id: "4",
        name: "Kofi Mensah",
        specialization: "Wood Carving",
        image: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?auto=format&fit=crop&q=80&w=800",
        description: "Intricate wood carvings telling ancestral stories.",
    },
    {
        id: "5",
        name: "Sarah Jenkins",
        specialization: "Glass Blowing",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800",
        description: "Modern glass art playing with light and color.",
    },
    {
        id: "6",
        name: "Rajiv Kumar",
        specialization: "Brass Work",
        image: "https://images.unsplash.com/photo-1596637500196-0e96495cb2e7?auto=format&fit=crop&q=80&w=800",
        description: "Traditional brass artifacts and home decor.",
    },
];

export default function SponsorDashboard() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-2xl font-bold font-serif text-primary">Sponsor Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Welcome, Sponsor</div>
                        <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">S</div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-12">

                {/* Featured Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                        <h2 className="text-3xl font-bold">Featured Artisans</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredArtisans.map((artisan) => (
                            <Link href={`/sponsor/artisan/${artisan.id}`} key={artisan.id} className="group relative overflow-hidden rounded-2xl aspect-[2/1] bg-muted">
                                <img
                                    src={artisan.image}
                                    alt={artisan.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                                    <h3 className="text-2xl font-bold mb-1">{artisan.name}</h3>
                                    <p className="text-white/90 font-medium">{artisan.specialization}</p>
                                    <p className="text-sm text-white/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{artisan.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Categories Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">Browse Categories</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((cat) => (
                            <button key={cat.name} className="flex-shrink-0 px-6 py-3 bg-secondary/50 hover:bg-secondary rounded-full border border-secondary transition-colors text-secondary-foreground font-medium">
                                {cat.name} <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* All Artisans Grid */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Heart className="h-6 w-6 text-red-500" />
                        <h2 className="text-2xl font-bold">Discover Artisans</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allArtisans.map((artisan) => (
                            <Link href={`/sponsor/artisan/${artisan.id}`} key={artisan.id} className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300">
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={artisan.image}
                                        alt={artisan.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg">{artisan.name}</h3>
                                    <p className="text-sm text-primary font-medium">{artisan.specialization}</p>
                                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{artisan.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
