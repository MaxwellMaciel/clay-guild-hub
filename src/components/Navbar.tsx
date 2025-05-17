
import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4 md:px-6 bg-gradient-to-r from-gremio-primary to-gremio-secondary rounded-b-[24px] backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gremio-primary flex items-center justify-center text-white font-bold text-lg shadow-clay-button">
              GE
            </div>
            <div>
              <h1 className="font-bold text-white text-xl md:text-2xl">Grêmio Estudantil</h1>
              <p className="text-xs text-white/80">Escola Modelo</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden bg-white/20 text-white p-3 rounded-full shadow-clay-button" 
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
          <nav className="hidden md:flex items-center gap-8">
            <div className="bg-white/10 backdrop-blur-lg px-8 py-2 rounded-full">
              <div className="flex items-center gap-8">
                <NavLink to="/">Início</NavLink>
                <NavLink to="/equipe">Equipe</NavLink>
                <NavLink to="/projetos">Projetos</NavLink>
                <NavLink to="/noticias">Notícias</NavLink>
                <NavLink to="/contato">Contato</NavLink>
              </div>
            </div>
            
            {/* Theme toggle */}
            <button className="bg-white/10 backdrop-blur-lg w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Moon size={18} />
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-clay p-6 rounded-b-clay md:hidden flex flex-col gap-4">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Início</MobileNavLink>
              <MobileNavLink to="/equipe" onClick={() => setIsOpen(false)}>Equipe</MobileNavLink>
              <MobileNavLink to="/projetos" onClick={() => setIsOpen(false)}>Projetos</MobileNavLink>
              <MobileNavLink to="/noticias" onClick={() => setIsOpen(false)}>Notícias</MobileNavLink>
              <MobileNavLink to="/contato" onClick={() => setIsOpen(false)}>Contato</MobileNavLink>
            </div>
          )}
        </div>
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
    className="text-white hover:text-white/80 transition-colors relative group py-1 font-medium"
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
