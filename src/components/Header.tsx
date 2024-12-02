import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate } = useLanguage();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: translate("logout_success"),
        description: translate("logout_success_message"),
      });
    } catch (error) {
      toast({
        title: translate("error"),
        description: translate("logout_error_message"),
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b bg-ayurveda-background">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/services" className="flex items-center gap-2">
          <div className="flex items-center font-serif">
            <span className="text-2xl font-medium text-ayurveda-primary">Ayur</span>
            <span className="text-2xl font-medium text-ayurveda-gold">Veda</span>
            <span className="text-xl text-ayurveda-teal ml-1">Centre</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            to="/services" 
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            {translate("home")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors flex items-center gap-1">
              {translate("services")} <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-ayurveda-background border-ayurveda-accent/20">
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/consultation" className="w-full">
                  {translate("consultation")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/medicine" className="w-full">
                  {translate("medicine")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/education" className="w-full">
                  {translate("education")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/detox" className="w-full">
                  {translate("detox")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-ayurveda-accent/10">
                <Link to="/panchakarma" className="w-full">
                  {translate("panchakarma")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            to="/chat/dosha" 
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            {translate("determine_dosha")}
          </Link>
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;