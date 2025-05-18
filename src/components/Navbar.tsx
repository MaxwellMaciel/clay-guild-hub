
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-4 z-50 w-full max-w-6xl mx-auto px-4">
      <div className="w-full rounded-full bg-white/80 backdrop-blur-md shadow-clay-sm border border-white/50 relative overflow-hidden">
        <div className="container mx-auto flex justify-between items-center py-3 px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gremio-primary flex items-center justify-center text-white font-bold text-lg">
              GE
            </div>
            <div>
              <h1 className="font-bold text-gremio-primary text-xl md:text-2xl">Grêmio Estudantil</h1>
              <p className="text-xs text-muted-foreground">Escola Modelo</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden bg-gremio-primary text-white p-3 rounded-full shadow-clay-button" 
            onClick={() => setIsOpen(!isOpen)}
          >
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
            >
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" isActive={location.pathname === "/"}>Início</NavLink>
            <NavLink to="/equipe" isActive={location.pathname === "/equipe"}>Equipe</NavLink>
            <NavLink to="/projetos" isActive={location.pathname === "/projetos"}>Projetos</NavLink>
            <NavLink to="/noticias" isActive={location.pathname === "/noticias"}>Notícias</NavLink>
            <NavLink to="/contato" isActive={location.pathname === "/contato"}>Contato</NavLink>
            
            {/* Theme toggle */}
            <button className="clay-icon w-10 h-10 text-gray-500 ml-2 rounded-full flex items-center justify-center bg-white shadow-clay-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>
          </nav>
        </div>
        
        {/* Purple gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gremio-primary to-gremio-light"></div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-clay p-6 rounded-clay md:hidden flex flex-col gap-4">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Início</MobileNavLink>
          <MobileNavLink to="/equipe" onClick={() => setIsOpen(false)}>Equipe</MobileNavLink>
          <MobileNavLink to="/projetos" onClick={() => setIsOpen(false)}>Projetos</MobileNavLink>
          <MobileNavLink to="/noticias" onClick={() => setIsOpen(false)}>Notícias</MobileNavLink>
          <MobileNavLink to="/contato" onClick={() => setIsOpen(false)}>Contato</MobileNavLink>
        </div>
      )}
    </header>
  );
};

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
};

const NavLink = ({ to, children, isActive }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 relative ${
      isActive 
        ? "bg-purple-100/80 text-gremio-primary shadow-clay-inner" 
        : "text-gray-500 hover:text-gremio-primary"
    }`}
  >
    {children}
  </Link>
);

type MobileNavLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
};

const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="text-foreground hover:text-gremio-primary transition-colors py-3 px-4 rounded-xl hover:bg-gremio-soft/50 font-medium"
  >
    {children}
  </Link>
);

export default Navbar;
