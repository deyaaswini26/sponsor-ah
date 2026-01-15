"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Store, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";

type Role = "buyer" | "artisan" | "sponsor";

interface AuthFormProps {
    defaultRole?: Role;
}

export default function AuthForm({ defaultRole = "buyer" }: AuthFormProps) {
    const router = useRouter();
    const [role, setRole] = useState<Role>(defaultRole);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [phone, setPhone] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            if (phone === "8838265953") {
                // Test case: do nothing, expect 123456
                console.log("Test number used. Waiting for 123456.");
            } else {
                // Generate random 6 digit OTP
                const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                setGeneratedOtp(newOtp);
                alert(`Your OTP is: ${newOtp}`); // Displaying it for user testing
            }
            setOtpSent(true);
            setIsLoading(false);
        }, 1000);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let isValid = false;

            if (phone === "8838265953") {
                if (otp === "123456") isValid = true;
            } else {
                if (otp === generatedOtp) isValid = true;
            }

            if (isValid) {
                // Route based on role
                if (role === "sponsor") {
                    router.push("/sponsor");
                } else if (role === "artisan") {
                    // For now, redirect artisans to home or a placeholder if no artisan dashboard exists
                    // Assuming home for now as per instructions
                    router.push("/");
                } else {
                    // Buyer
                    router.push("/");
                }
            } else {
                throw new Error("Invalid phone number or OTP.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    // Dynamic Content based on Role
    let roleTitle = "Login";
    let roleIcon = null;

    if (role === 'sponsor') {
        roleTitle = "Sponsor Login";
        roleIcon = (
            <div className="w-16 h-16 text-[#FF5A5F] mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            </div>
        );
    } else if (role === 'artisan') {
        roleTitle = "Artisan Login";
        roleIcon = <Sparkles className="w-16 h-16 text-[#FF5A5F] mb-6" />;
    } else {
        roleTitle = "Buyer Login";
        roleIcon = <Store className="w-16 h-16 text-[#FF5A5F] mb-6" />;
    }

    return (
        <div className="w-full max-w-[340px] mx-auto p-8 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center space-y-2 mb-8 text-center">
                {roleIcon}
                <h2 className="text-2xl font-serif font-bold text-[#1C1C1C]">{roleTitle}</h2>
                <p className="text-sm text-[#6B6B6B]">Enter your phone number to access your account</p>
            </div>

            {/* Optional: Unified Role Toggles at the top if user wants to switch context here? 
                The user's prompt implied "when i click artisan... log in page must be like sponsor".
                Usually this means sticking to the role they selected. 
                I will add small toggles just in case they misclicked, for better UX, or leave it cleaner.
                Let's keep it clean as per the specific "Sponsor Login" design which didn't have toggles.
            */}

            {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm text-[#1C1C1C]">
                            Mobile Number
                        </label>
                        <div className="flex gap-2">
                            <div className="flex items-center justify-center px-3 py-2 bg-[#EFEFEF] rounded-md text-[#6B6B6B] text-sm font-medium min-w-[50px]">
                                +91
                            </div>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="10-digit mobile number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="flex-1 px-3 py-2 bg-[#FAF8F3] border-none rounded-md text-sm placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#FF5A5F] outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-[#EE4B50] hover:bg-[#D43B40] text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-70"
                    >
                        {isLoading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="otp" className="text-sm text-[#1C1C1C]">
                            Enter OTP
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-[#FAF8F3] border-none rounded-md text-sm placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#FF5A5F] outline-none"
                        />
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-[#EE4B50] hover:bg-[#D43B40] text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-70"
                    >
                        {isLoading ? "Verifying..." : "Verify & Login"}
                    </button>
                </form>
            )}

            <div className="mt-8 text-center">
                <button type="button" className="text-xs text-[#FF5A5F] hover:underline">
                    Terms & Conditions
                </button>
            </div>
            <div className="mt-4 text-center">
                <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
