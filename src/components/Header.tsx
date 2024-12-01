import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-ayurveda-background">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/services" className="text-ayurveda-primary text-xl font-semibold">
          Ayurveda
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            to="/services" 
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            Главная страница
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors flex items-center gap-1">
              Услуги <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-ayurveda-background border-ayurveda-accent/20">
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/chat/nutrition" className="w-full">
                  Питание
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/chat/lifestyle" className="w-full">
                  Образ жизни
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/chat/herbs" className="w-full">
                  Травы
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            to="/chat/dosha" 
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            Определить дошу
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;