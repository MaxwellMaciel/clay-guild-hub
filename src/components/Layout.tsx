import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Instagram, Facebook, Twitter, Sun, Moon } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  currentPageName: string;
};

export default function Layout({ children, currentPageName }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Try to load theme from localStorage or use system preference
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // Apply 'dark' class to HTML and save to localStorage
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--page-bg-start)] to-[var(--page-bg-end)]">
      <style>{`
        :root { /* Light Mode */
          --clay-bg: #f5f3ff; /* Fundo de elementos clay */
          --clay-text: #4b5563; /* Texto principal em elementos clay */
          --clay-shadow-inset: inset 2px 2px 5px rgba(163, 163, 163, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.7);
          --clay-shadow-small: 5px 5px 10px rgba(163, 163, 163, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.7);
          --clay-shadow-medium: 8px 8px 16px rgba(163, 163, 163, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.7);
          
          --primary-color: #8b5cf6; /* Roxo principal */
          --primary-color-hover: #7c3aed;
          --secondary-color: #60a5fa; /* Azul secundário */
          --accent-color: #c4b5fd; /* Roxo claro para acentos */
          --accent-bg: #ede9fe; /* Fundo para seções de destaque, e.g., bg-purple-100 */

          --page-bg-start: #f3e8ff; 
          --page-bg-end: #e0f2fe;   

          --text-headings: #6d28d9; /* Roxo mais escuro para títulos principais */
          --text-default: #374151; /* Cinza escuro para texto normal */
          --text-muted: #6b7280; /* Cinza para texto secundário */
          --text-on-primary-bg: #ffffff; 
          
          --header-bg: rgba(255, 255, 255, 0.8);
          --footer-bg: #6d28d9; /* bg-purple-700 */
          --footer-text: #e9d5ff; /* text-purple-200 */
          --footer-text-strong: #ffffff;
          --footer-border: #a78bfa; /* border-purple-500 */
          --footer-icon-bg: rgba(255, 255, 255, 0.2);
          --footer-icon-bg-hover: rgba(255, 255, 255, 0.3);
        }

        html.dark { /* Dark Mode */
          --clay-bg: #4A4458; /* Roxo-acinzentado escuro para elementos clay */
          --clay-text: #E0E0E0; /* Texto claro em elementos clay */
          --clay-shadow-inset: inset 3px 3px 6px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(100,90,120,0.3);
          --clay-shadow-small: 6px 6px 12px rgba(0,0,0,0.4), -6px -6px 12px rgba(100,90,120,0.3);
          --clay-shadow-medium: 10px 10px 20px rgba(0,0,0,0.4), -10px -10px 20px rgba(100,90,120,0.3);

          --primary-color: #a78bfa; /* Lilás */
          --primary-color-hover: #c4b5fd;
          --secondary-color: #93c5fd; /* Azul claro */
          --accent-color: #7c3aed; /* Roxo vibrante para acentos */
          --accent-bg: #37304f; /* Fundo para seções de destaque escuras */

          --page-bg-start: #2D2A40; 
          --page-bg-end: #1E293B;   

          --text-headings: #c4b5fd; /* Lilás claro para títulos */
          --text-default: #D1D5DB; /* Cinza claro para texto normal */
          --text-muted: #9CA3AF; /* Cinza médio para texto secundário */
          --text-on-primary-bg: #111827;
          
          --header-bg: rgba(29, 25, 40, 0.8); /* Baseado no roxo escuro */
          --footer-bg: #1e1b2e; /* Mais escuro que --page-bg-start */
          --footer-text: #a78bfa; /* text-purple-400 */
          --footer-text-strong: #e0e0e0;
          --footer-border: #5b21b6; /* border-purple-700 */
          --footer-icon-bg: rgba(167, 139, 250, 0.2); /* roxo claro transparente */
          --footer-icon-bg-hover: rgba(167, 139, 250, 0.3);
        }

        .clay-card {
          background: var(--clay-bg);
          border-radius: 20px;
          box-shadow: var(--clay-shadow-small);
          transition: all 0.3s ease;
          color: var(--text-default);
        }
        
        .clay-card:hover {
          box-shadow: var(--clay-shadow-medium);
        }

        .clay-button {
          background: var(--clay-bg);
          color: var(--clay-text);
          border-radius: 12px;
          box-shadow: var(--clay-shadow-small);
          transition: all 0.2s ease;
        }
        
        .clay-button:hover {
          box-shadow: var(--clay-shadow-inset);
          transform: translateY(1px); /* Slight press effect */
        }
        .clay-button:active, .clay-pressed {
          box-shadow: var(--clay-shadow-inset) !important; /* Important to override hover */
          transform: translateY(2px) !important;
        }

        .clay-input {
          background: var(--clay-bg);
          color: var(--clay-text);
          border-radius: 12px;
          box-shadow: var(--clay-shadow-inset);
          transition: all 0.2s ease;
          border: 1px solid transparent; /* Placeholder for focus */
        }
        
        .clay-input:focus {
          box-shadow: var(--clay-shadow-small);
          border-color: var(--primary-color);
        }

        .clay-nav-item {
          transition: all 0.3s ease;
          color: var(--text-muted);
        }
        .clay-nav-item.active {
          background: var(--clay-bg);
          box-shadow: var(--clay-shadow-inset);
          color: var(--primary-color);
        }
        .clay-nav-item:not(.active):hover {
          background: var(--clay-bg);
          opacity: 0.7;
        }
      `}</style>

      {/* Header */}
      <header 
        className="backdrop-filter backdrop-blur-md py-4 px-6 sticky top-0 z-50 clay-card border-b-4 w-full"
        style={{ 
          backgroundColor: 'var(--header-bg)', 
          borderColor: 'var(--primary-color)' 
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to={createPageUrl("Home")} className="flex items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3"
              style={{ background: `linear-gradient(to bottom right, var(--primary-color), var(--secondary-color))`}}
            >
              GE
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>Grêmio Estudantil</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>IFCE - Campus Marangupe</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="Home" currentPage={currentPageName}>
                Início
              </NavLink>
              <NavLink to="Membros" currentPage={currentPageName}>
                Equipe
              </NavLink>
              <NavLink to="Projetos" currentPage={currentPageName}>
                Projetos
              </NavLink>
              <NavLink to="Noticias" currentPage={currentPageName}>
                Notícias
              </NavLink>
              <NavLink to="Contato" currentPage={currentPageName}>
                Contato
              </NavLink>
            </nav>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="clay-button p-2.5 ml-2"
              aria-label="Alternar tema"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden clay-button p-2.5" onClick={toggleMenu} aria-label="Abrir menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-[55] bg-black/50 dark:bg-black/70 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed right-0 top-0 h-full w-72 transform transition-transform duration-300 ease-in-out overflow-y-auto clay-card rounded-l-3xl border-l-4 z-[60] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ 
            backgroundColor: 'var(--clay-bg)',
            borderColor: 'var(--primary-color)' 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 pt-8 space-y-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold" style={{ color: 'var(--text-headings)' }}>Menu</span>
              <button className="clay-button p-2" onClick={toggleMenu} aria-label="Fechar menu">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col space-y-3 flex-grow">
              <MobileNavLink to="Home" onClick={toggleMenu} currentPage={currentPageName}>
                Início
              </MobileNavLink>
              <MobileNavLink to="Membros" onClick={toggleMenu} currentPage={currentPageName}>
                Equipe
              </MobileNavLink>
              <MobileNavLink to="Projetos" onClick={toggleMenu} currentPage={currentPageName}>
                Projetos
              </MobileNavLink>
              <MobileNavLink to="Noticias" onClick={toggleMenu} currentPage={currentPageName}>
                Notícias
              </MobileNavLink>
              <MobileNavLink to="Contato" onClick={toggleMenu} currentPage={currentPageName}>
                Contato
              </MobileNavLink>
            </nav>

            <div className="mt-auto">
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Siga nossas redes:</p>
              <div className="flex space-x-3">
                <a href="https://instagram.com/gremio.ifce" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:opacity-80 transition-opacity" style={{ color: 'var(--primary-color)', background: 'var(--accent-bg)' }}>
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 mt-8 text-[var(--footer-text)]" style={{ backgroundColor: 'var(--footer-bg)'}}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--footer-text-strong)'}}>Grêmio Estudantil</h3>
              <p className="mb-2">
                Representando os estudantes e promovendo atividades que enriquecem a vida escolar.
              </p>
              <p>
                <strong>Horário de atendimento:</strong> Segunda a Sexta, 10h às 15h
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--footer-text-strong)'}}>IFCE - Campus Marangupe</h3>
              <p className="mb-2">Sala do Grêmio Estudantil, sala 106, segundo andar</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 text-center text-sm" style={{ borderColor: 'var(--footer-border)', borderTopWidth: '1px'}}>
            <p>© {new Date().getFullYear()} Grêmio Estudantil - IFCE Campus Marangupe. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
  currentPage: string;
};

function NavLink({ children, to, currentPage }: NavLinkProps) {
  const isActive = currentPage === to;
  return (
    <Link
      to={createPageUrl(to)}
      className={`px-4 py-2 rounded-xl font-medium clay-nav-item ${isActive ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}

type MobileNavLinkProps = {
  children: React.ReactNode;
  to: string;
  onClick: () => void;
  currentPage: string;
};

function MobileNavLink({ children, to, onClick, currentPage }: MobileNavLinkProps) {
  const isActive = currentPage === to;
  return (
    <Link
      to={createPageUrl(to)}
      onClick={onClick}
      className={`px-4 py-3.5 rounded-xl font-medium clay-nav-item block text-left text-lg ${isActive ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}
