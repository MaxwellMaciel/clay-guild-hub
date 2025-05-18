
import { useLocation, Link } from "react-router-dom";
import { Moon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 w-full z-50 bg-gradient-to-r from-gremio-soft to-purple-100 border-b border-gremio-light/30">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gremio-primary flex items-center justify-center text-white font-bold text-lg">
            GE
          </div>
          <div>
            <h1 className="font-bold text-gremio-primary text-xl md:text-2xl">Grêmio Estudantil</h1>
            <p className="text-xs text-muted-foreground">Escola Modelo</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="flex items-center gap-4">
          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={`px-5 py-2 text-base font-medium ${
                        location.pathname === "/" 
                          ? "text-gremio-primary" 
                          : "text-gray-500 hover:text-gremio-primary"
                      }`}
                    >
                      Início
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/equipe">
                    <NavigationMenuLink 
                      className={`px-5 py-2 text-base font-medium ${
                        location.pathname === "/equipe" 
                          ? "text-gremio-primary" 
                          : "text-gray-500 hover:text-gremio-primary"
                      }`}
                    >
                      Equipe
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/projetos">
                    <NavigationMenuLink 
                      className={`px-5 py-2 text-base font-medium ${
                        location.pathname === "/projetos" 
                          ? "text-gremio-primary" 
                          : "text-gray-500 hover:text-gremio-primary"
                      }`}
                    >
                      Projetos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/noticias">
                    <NavigationMenuLink 
                      className={`px-5 py-2 text-base font-medium ${
                        location.pathname === "/noticias" 
                          ? "text-gremio-primary" 
                          : "text-gray-500 hover:text-gremio-primary"
                      }`}
                    >
                      Notícias
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contato">
                    <NavigationMenuLink 
                      className={`px-5 py-2 text-base font-medium ${
                        location.pathname === "/contato" 
                          ? "text-gremio-primary" 
                          : "text-gray-500 hover:text-gremio-primary"
                      }`}
                    >
                      Contato
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
          
          {/* Theme toggle */}
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Moon className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Mobile menu button */}
          {isMobile && (
            <button className="p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gremio-primary"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
