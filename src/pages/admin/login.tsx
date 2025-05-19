import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

// ATENÇÃO: Nunca use validação de senha no front-end em produção!
// Isso é apenas para ambiente de desenvolvimento/local.
const SENHA_ADMIN = 'admin123';

export default function AdminLogin() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin/noticias';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Salva o token JWT no localStorage
        localStorage.setItem('admin_token', data.token);
        navigate(from);
      } else {
        setErro(data.message || 'Senha incorreta');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.debug('[DEBUG] Página de login carregada. Query from:', from);
  }, [from]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="clay-card p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-headings)' }}>
            Área Administrativa
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Faça login para gerenciar as notícias
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
                disabled={loading}
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
            disabled={loading}
          >
            <Lock size={18} />
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="text-xs mt-4 text-center text-[var(--text-muted)]">
          <b>Aviso:</b> Agora a senha é validada no backend Express com JWT.<br />
          Em produção, use HTTPS e tokens JWT!
        </p>
      </div>
    </div>
  );
} 