import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-ayurveda-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/services" className="text-ayurveda-primary text-xl font-semibold">
          Ayurveda
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-ayurveda-background hover:bg-ayurveda-accent/20">
                Меню
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[200px]">
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/services" 
                      className="block p-2 hover:bg-ayurveda-accent/20 rounded-md text-ayurveda-primary"
                    >
                      Главная страница
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/chat/dosha" 
                      className="block p-2 hover:bg-ayurveda-accent/20 rounded-md text-ayurveda-primary"
                    >
                      Определить дошу
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;