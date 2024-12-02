import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-ayurveda-background border-ayurveda-accent/20">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            className={`hover:bg-ayurveda-accent/10 ${currentLanguage === lang.id ? 'font-medium' : ''}`}
            onClick={() => setLanguage(lang.id)}
          >
            {lang.native_name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};