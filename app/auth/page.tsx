"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/auth-form";

function AuthPageContent() {
    const searchParams = useSearchParams();
    const roleParam = searchParams.get("role");
    const defaultRole = (roleParam === "artisan") ? "artisan" : "buyer";

    return (
        <div className="min-h-screen flex items-center justify-center bg-accent/5 px-4 py-12">
            <AuthForm defaultRole={defaultRole} />
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AuthPageContent />
        </Suspense>
    );
}
