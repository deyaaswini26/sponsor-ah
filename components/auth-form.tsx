"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2, Sparkles, Store } from "lucide-react";
import Link from "next/link";

type Role = "buyer" | "artisan";
type AuthMode = "signin" | "signup";

interface AuthFormProps {
    defaultRole?: Role;
}

export default function AuthForm({ defaultRole = "buyer" }: AuthFormProps) {
    const router = useRouter();
    const [role, setRole] = useState<Role>(defaultRole);
    const [mode, setMode] = useState<AuthMode>("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === "signup") {
                await createUserWithEmailAndPassword(auth, email, password);
                // NOTE: In a real app, you would save the 'role' to a database (Firestore) here
                // linked to the user's UID.
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }

            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred during authentication.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-8 bg-card rounded-2xl shadow-lg border border-border/50">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tight">
                    {mode === "signin" ? "Welcome Back" : "Join Artistry Havens"}
                </h2>
                <p className="text-muted-foreground">
                    {mode === "signin"
                        ? "Enter your details to access your account"
                        : "Start your journey with us today"}
                </p>
            </div>

            {/* Role Selection (only for signup usually, but let's keep it visible/active for context or if we want to segment login logic later) */}
            <div className="flex p-1 bg-accent/20 rounded-lg">
                <button
                    onClick={() => setRole("buyer")}
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${role === "buyer"
                            ? "bg-background text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-background/50"
                        }`}
                >
                    <Store className="w-4 h-4" />
                    Buyer
                </button>
                <button
                    onClick={() => setRole("artisan")}
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${role === "artisan"
                            ? "bg-background text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-background/50"
                        }`}
                >
                    <Sparkles className="w-4 h-4" />
                    Artisan
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center w-full h-11 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : mode === "signin" ? (
                        "Sign In"
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">
                    {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                    onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                    className="font-medium text-primary hover:underline underline-offset-4"
                >
                    {mode === "signin" ? "Sign up" : "Sign in"}
                </button>
            </div>

            <div className="text-center">
                <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
