
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es';

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  nl: { name: "Nederlands", flag: "🇳🇱" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  fr: { name: "Français", flag: "🇫🇷" },
  es: { name: "Español", flag: "🇪🇸" }
};

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (language: SupportedLanguage) => {
    console.log('Changing language to:', language);
    changeLanguage(language);
    // Force a page refresh to ensure all components re-render with new language
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 hover:bg-emerald-50">
          <span className="text-lg">{languages[currentLanguage].flag}</span>
          <span className="hidden sm:inline font-medium">
            {languages[currentLanguage].name}
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
            className={`cursor-pointer ${currentLanguage === code ? "bg-emerald-50 text-emerald-700 font-medium" : "hover:bg-gray-50"}`}
          >
            <span className="mr-3 text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
            {currentLanguage === code && (
              <span className="ml-auto text-emerald-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
