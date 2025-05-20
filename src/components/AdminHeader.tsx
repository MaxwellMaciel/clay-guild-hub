
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, FileText, Folder, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="mb-8">
      <div className="clay-card p-4 mb-4" style={{ backgroundColor: 'var(--clay-bg)', borderColor: 'var(--primary-color)' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>
            Painel Administrativo
          </h1>
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="clay-button px-3 py-2 flex items-center gap-2 transition-all"
              style={{ color: 'var(--text-default)' }}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="clay-button px-3 py-2 flex items-center gap-2 transition-all"
              style={{ color: 'var(--error-color, "#ff4d4d")' }}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pt-4">
          <Link
            to="/admin/noticias"
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              isActive('/admin/noticias') 
                ? 'clay-pressed' 
                : 'clay-button'
            }`}
            style={{ 
              color: isActive('/admin/noticias') ? 'var(--primary-color)' : 'var(--text-default)',
            }}
          >
            <FileText size={18} />
            Notícias
          </Link>
          <Link
            to="/admin/projetos"
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              isActive('/admin/projetos') 
                ? 'clay-pressed' 
                : 'clay-button'
            }`}
            style={{ 
              color: isActive('/admin/projetos') ? 'var(--primary-color)' : 'var(--text-default)',
            }}
          >
            <Folder size={18} />
            Projetos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
