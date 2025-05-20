import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/noticias');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Tentando login com:', email);
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login realizado com sucesso!');
        navigate('/admin/noticias');
      } else {
        toast.error('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[var(--page-bg-start)] to-[var(--page-bg-end)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          className="clay-card p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Elementos decorativos */}
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-[var(--primary-color)] opacity-10 rounded-full filter blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[var(--secondary-color)] opacity-10 rounded-full filter blur-2xl"></div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full clay-pressed flex items-center justify-center">
                <Lock size={32} style={{ color: 'var(--primary-color)' }} />
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-headings)' }}>
                Acesso Administrativo
              </h1>
              <p className="text-[var(--text-muted)]">
                Digite suas credenciais para acessar o painel administrativo
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="clay-input w-full px-4 py-3 pl-12"
                  placeholder="Digite seu email"
                  required
                  disabled={loading}
                />
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="clay-input w-full px-4 py-3 pl-12"
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                />
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 clay-button p-2"
                  style={{ color: 'var(--text-muted)' }}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <motion.button
                type="submit"
                className="clay-button w-full px-6 py-3 font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent"></div>
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Entrar
                  </>
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <p>Esqueceu suas credenciais? Entre em contato com o administrador.</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
