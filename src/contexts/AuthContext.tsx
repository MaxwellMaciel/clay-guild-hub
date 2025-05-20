import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  session: null,
  login: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log('AuthProvider: Iniciando verificação de sessão');
    
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Erro ao verificar sessão:', error);
        return;
      }
      console.log('Sessão atual:', session);
      setSession(session);
      setIsAuthenticated(!!session);
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Mudança no estado de autenticação:', event, session);
      setSession(session);
      setIsAuthenticated(!!session);
    });

    return () => {
      console.log('AuthProvider: Limpando subscription');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Tentando login com:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro no login:', error);
        toast.error(error.message);
        return false;
      }

      console.log('Login bem sucedido:', data);
      return true;
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      toast.error('Erro inesperado ao fazer login');
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Tentando logout');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro no logout:', error);
        toast.error('Erro ao fazer logout');
        return;
      }
      
      console.log('Logout bem sucedido');
      toast.success('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro inesperado no logout:', error);
      toast.error('Erro inesperado ao fazer logout');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
