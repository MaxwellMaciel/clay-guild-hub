
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
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Painel Administrativo
          </h1>
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2 transition-all"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-2 transition-all"
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
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText size={18} />
            Notícias
          </Link>
          <Link
            to="/admin/projetos"
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              isActive('/admin/projetos') 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
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
