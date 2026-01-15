import Link from "next/link";
import { Globe } from "lucide-react";

export default function LanguageSelection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-8 bg-[#FDFBF7]">
      <div className="space-y-4 text-center max-w-sm">
        <div className="mx-auto w-12 h-12 text-[#FF5A5F] mb-6 animate-pulse">
          <Globe className="w-full h-full" />
        </div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1C1C]">
          Select Language
        </h1>
        <p className="text-base text-[#6B6B6B]">
          Choose your preferred language to continue
        </p>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <LanguageOption href="/select-role" language="English" native="English" />
        <LanguageOption href="/select-role" language="Hindi" native="हिंदी" />
        <LanguageOption href="/select-role" language="Tamil" native="தமிழ்" />
      </div>
    </div>
  );
}

function LanguageOption({
  href,
  language,
  native,
}: {
  href: string;
  language: string;
  native: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent hover:border-[#FF5A5F]/20 hover:shadow-md transition-all active:scale-95 group"
    >
      <span className="font-medium text-[#1C1C1C] group-hover:text-[#FF5A5F] transition-colors">
        {language}
      </span>
      <span className="text-sm text-[#6B6B6B] font-serif">
        {native}
      </span>
    </Link>
  );
}
