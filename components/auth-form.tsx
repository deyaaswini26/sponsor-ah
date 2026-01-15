"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2, Sparkles, Store, Building2 } from "lucide-react";
import Link from "next/link";

type Role = "buyer" | "artisan" | "sponsor";
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

    // Sponsor specific state
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (role === "sponsor") {
                // Hardcoded check/test-case for Sponsor
                if (phone === "8838265953" && otp === "123456") {
                    // Successful "test" login
                    router.push("/sponsor");
                } else {
                    throw new Error("Invalid phone number or OTP.");
                }
            } else {
                // Existing logic for Buyer/Artisan
                if (mode === "signup") {
                    await createUserWithEmailAndPassword(auth, email, password);
                    // NOTE: In a real app, you would save the 'role' to a database here
                } else {
                    await signInWithEmailAndPassword(auth, email, password);
                }
                router.push("/");
            }
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
                    {role === "sponsor"
                        ? "Sponsor Access"
                        : mode === "signin" ? "Welcome Back" : "Join Artistry Havens"}
                </h2>
                <p className="text-muted-foreground">
                    {role === "sponsor"
                        ? "Enter your verified credentials"
                        : mode === "signin"
                            ? "Enter your details to access your account"
                            : "Start your journey with us today"}
                </p>
            </div>

            {/* Role Selection */}
            <div className="flex p-1 bg-accent/20 rounded-lg overflow-x-auto">
                <button
                    onClick={() => setRole("buyer")}
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${role === "buyer"
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
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${role === "artisan"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-background/50"
                        }`}
                >
                    <Sparkles className="w-4 h-4" />
                    Artisan
                </button>
                <button
                    onClick={() => setRole("sponsor")}
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${role === "sponsor"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-background/50"
                        }`}
                >
                    <Building2 className="w-4 h-4" />
                    Sponsor
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {role === "sponsor" ? (
                    <>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium leading-none">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="1234567890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="otp" className="text-sm font-medium leading-none">
                                OTP
                            </label>
                            <input
                                id="otp"
                                type="text"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </>
                )}

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
                    ) : (
                        role === "sponsor" ? "Verify & Enter" : (mode === "signin" ? "Sign In" : "Create Account")
                    )}
                </button>
            </form>

            <div className="text-center text-sm">
                {role !== "sponsor" && (
                    <>
                        <span className="text-muted-foreground">
                            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                            className="font-medium text-primary hover:underline underline-offset-4"
                        >
                            {mode === "signin" ? "Sign up" : "Sign in"}
                        </button>
                    </>
                )}
            </div>

            <div className="text-center">
                <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
