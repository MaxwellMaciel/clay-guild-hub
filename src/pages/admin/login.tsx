import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();
  const { from } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    console.debug('[DEBUG] Tentando login com senha:', senha);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha }),
      });
      console.debug('[DEBUG] Resposta da API de login:', response.status);

      if (response.ok) {
        console.debug('[DEBUG] Login bem-sucedido. Redirecionando para:', (from as string) || '/admin/noticias');
        router.push((from as string) || '/admin/noticias');
      } else {
        setErro('Senha incorreta');
        console.warn('[DEBUG] Senha incorreta');
      }
    } catch (error) {
      setErro('Erro ao fazer login');
      console.error('[DEBUG] Erro ao fazer login:', error);
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
                onChange={(e) => {
                  setSenha(e.target.value);
                  console.debug('[DEBUG] Campo senha alterado:', e.target.value);
                }}
                className="clay-input w-full pl-10"
                required
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
          >
            <Lock size={18} />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
} 