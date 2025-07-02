
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
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 hover:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          aria-label={`Current language: ${languages[currentLanguage].name}. Click to change language`}
        >
          <span className="text-lg" aria-hidden="true">{languages[currentLanguage].flag}</span>
          <span className="hidden sm:inline font-medium">
            {languages[currentLanguage].name}
          </span>
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[150px] bg-white shadow-lg border border-gray-200 rounded-md z-50"
        sideOffset={4}
      >
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
            className={`cursor-pointer py-2 px-3 flex items-center transition-colors ${
              currentLanguage === code 
                ? "bg-emerald-50 text-emerald-700 font-medium" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
            aria-label={`Switch to ${lang.name}`}
          >
            <span className="mr-3 text-lg" aria-hidden="true">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {currentLanguage === code && (
              <span className="ml-2 text-emerald-600 font-bold" aria-label="Currently selected">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
