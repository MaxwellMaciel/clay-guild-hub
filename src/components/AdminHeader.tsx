import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, FileText, Folder, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair do painel administrativo?')) {
      logout();
      toast.success('Logout realizado com sucesso');
      navigate('/admin/login');
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/admin/noticias',
      label: 'Notícias',
      icon: FileText
    },
    {
      path: '/admin/projetos',
      label: 'Projetos',
      icon: Folder
    }
  ];

  return (
    <div className="mb-8">
      <motion.div 
        className="clay-card p-4 mb-4 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'var(--clay-bg)', borderColor: 'var(--primary-color)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="clay-button p-2 md:hidden"
              style={{ color: 'var(--text-default)' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>
              Painel Administrativo
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="clay-button px-3 py-2 flex items-center gap-2 transition-all"
              style={{ color: 'var(--text-default)' }}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Site</span>
            </Link>
            <motion.button
              onClick={handleLogout}
              className="clay-button px-3 py-2 flex items-center gap-2 transition-all"
              style={{ color: 'var(--destructive)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sair</span>
            </motion.button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                      isActive(item.path) 
                        ? 'clay-pressed' 
                        : 'clay-button'
                    }`}
                    style={{ 
                      color: isActive(item.path) ? 'var(--primary-color)' : 'var(--text-default)',
                    }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-2 overflow-x-auto pt-4">
          {menuItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                  isActive(item.path) 
                    ? 'clay-pressed' 
                    : 'clay-button'
                }`}
                style={{ 
                  color: isActive(item.path) ? 'var(--primary-color)' : 'var(--text-default)',
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHeader;
