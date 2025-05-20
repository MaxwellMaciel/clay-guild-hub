
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>
          Painel Administrativo
        </h1>
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="clay-button p-2 flex items-center gap-2"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="clay-button p-2 flex items-center gap-2"
            style={{ color: 'var(--error-color)' }}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Link
          to="/admin/noticias"
          className={`clay-button px-4 py-2 flex items-center gap-2 ${
            isActive('/admin/noticias') ? 'active-tab' : ''
          }`}
          style={isActive('/admin/noticias') ? { 
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-on-primary-bg)' 
          } : {}}
        >
          <FileText size={18} />
          Notícias
        </Link>
        <Link
          to="/admin/projetos"
          className={`clay-button px-4 py-2 flex items-center gap-2 ${
            isActive('/admin/projetos') ? 'active-tab' : ''
          }`}
          style={isActive('/admin/projetos') ? { 
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-on-primary-bg)' 
          } : {}}
        >
          <Folder size={18} />
          Projetos
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
