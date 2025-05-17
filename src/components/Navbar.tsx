
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gremio-light/20 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gremio-primary flex items-center justify-center text-white font-bold">
            GE
          </div>
          <div>
            <h1 className="font-bold text-gremio-primary text-xl md:text-2xl">Grêmio Estudantil</h1>
            <p className="text-xs text-muted-foreground">Escola Modelo</p>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden clay-button !p-2 !rounded-lg" 
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
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/equipe">Equipe</NavLink>
          <NavLink to="/projetos">Projetos</NavLink>
          <NavLink to="/noticias">Notícias</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          
          {/* Theme toggle */}
          <button className="w-8 h-8 rounded-full bg-gremio-soft flex items-center justify-center">
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
              className="text-gremio-tertiary"
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden flex flex-col gap-3">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Início</MobileNavLink>
            <MobileNavLink to="/equipe" onClick={() => setIsOpen(false)}>Equipe</MobileNavLink>
            <MobileNavLink to="/projetos" onClick={() => setIsOpen(false)}>Projetos</MobileNavLink>
            <MobileNavLink to="/noticias" onClick={() => setIsOpen(false)}>Notícias</MobileNavLink>
            <MobileNavLink to="/contato" onClick={() => setIsOpen(false)}>Contato</MobileNavLink>
          </div>
        )}
      </div>
    </header>
  );
};

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const NavLink = ({ to, children }: NavLinkProps) => (
  <Link 
    to={to} 
    className="text-foreground hover:text-gremio-primary transition-colors relative group py-1"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gremio-primary transition-all duration-300 group-hover:w-full"></span>
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
    className="text-foreground hover:text-gremio-primary transition-colors py-2 px-3 rounded-lg hover:bg-gremio-soft/50"
  >
    {children}
  </Link>
);

export default Navbar;
