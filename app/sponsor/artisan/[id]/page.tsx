import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Award, CheckCircle } from "lucide-react";

// Mock Data Lookup (In a real app, this would be a server fetch)
const artisans = [
    {
        id: "1",
        name: "Aarav Patel",
        specialization: "Hand-Block Printing",
        location: "Jaipur, India",
        bio: "Aarav is a third-generation artisan dedicated to preserving the ancient art of Ajrakh block printing. He uses only natural vegetable dyes and ethically sourced cotton.",
        image: "https://images.unsplash.com/photo-1542206391-78c487ac2f39?auto=format&fit=crop&q=80&w=800",
        portfolio: [
            "https://images.unsplash.com/photo-1523992224759-4d6cb4668ba4?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1598555805545-2400e47190d9?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1628148674984-c6a6c0c16b52?auto=format&fit=crop&q=80&w=600"
        ]
    },
    {
        id: "2",
        name: "Mei Lin",
        specialization: "Ceramic Pottery",
        location: "Kyoto, Japan",
        bio: "Mei Lin fuses traditional Japanese techniques with modern aesthetics to create functional art. Her kiln-fired ceramics are known for their durability and unique glazes.",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800",
        portfolio: [
            "https://images.unsplash.com/photo-1565193566173-092dc0465c66?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610701596061-23f7dbf0d929?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1563293816-86d34483753b?auto=format&fit=crop&q=80&w=600"
        ]
    },
    // Default fallback for others
    {
        id: "default",
        name: "Artisan Profile",
        specialization: "Master Craftsman",
        location: "Global",
        bio: "This artisan is a master of their craft, creating unique handmade items that tell a story.",
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=800",
        portfolio: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1499856871940-a09e3f90b4e1?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1515405295579-ba7b454989cd?auto=format&fit=crop&q=80&w=600"
        ]
    }

];

export default async function ArtisanPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artisan = artisans.find(a => a.id === id) || artisans.find(a => a.id === 'default')!;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Navigation */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center text-white">
                <Link href="/sponsor" className="p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
            </div>

            {/* Hero Header */}
            <div className="relative h-[40vh] md:h-[50vh]">
                <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto">
                    <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full mb-3">
                        {artisan.specialization}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">{artisan.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{artisan.location}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Bio & Details */}
                <div className="md:col-span-2 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">About the Artisan</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {artisan.bio}
                        </p>
                        <div className="flex gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                                <CheckCircle className="h-4 w-4" /> Verified Artisan
                            </div>
                            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                                <Award className="h-4 w-4" /> Top Rated
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {artisan.portfolio.map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-muted">
                                    <img src={img} alt="Portfolio item" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl border bg-card shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Interested in Sponsoring?</h3>
                        <p className="text-muted-foreground mb-6">Support {artisan.name}'s craft and help bring their creations to a global audience.</p>
                        <div className="space-y-3">
                            <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-bold text-center hover:bg-primary/90 transition-colors">
                                Sponsor this Artisan
                            </button>
                            <button className="w-full py-3 px-4 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2">
                                <Mail className="h-4 w-4" /> Contact
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
