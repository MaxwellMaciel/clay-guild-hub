
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect parameter or default to /admin/noticias
  const from = new URLSearchParams(location.search).get('from') || '/admin/noticias';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setIsLoading(true);

    try {
      const success = await login(senha);
      
      if (success) {
        toast.success('Login realizado com sucesso');
        navigate(from);
      } else {
        setErro('Senha incorreta');
        toast.error('Senha incorreta');
      }
    } catch (error) {
      setErro('Erro ao fazer login');
      toast.error('Erro ao fazer login');
      console.error('Erro de login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="clay-card p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-headings)' }}>
            Área Administrativa
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Faça login para gerenciar o conteúdo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="clay-input w-full pl-10"
                required
                disabled={isLoading}
              />
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>

          {erro && (
            <p className="text-sm" style={{ color: 'var(--error-color)' }}>
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="clay-button w-full py-2 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : (
              <>
                <Lock size={18} />
                Entrar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
