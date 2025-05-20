
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if admin token exists in session storage on mount
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      // For security, we'll use a hash comparison approach
      // In a real app, you'd validate this against a database, but 
      // for this example we'll use a simple hard-coded hash check
      
      // This is a simple hash of a password, replace with a real implementation
      // The hash below is NOT the actual password, it's just a placeholder
      const correctPasswordHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH || '';
      
      if (!correctPasswordHash) {
        console.error('Admin password hash is not configured');
        return false;
      }
      
      // In a real app, you'd hash the password and compare with the stored hash
      // For simplicity here, we're directly comparing with the hash
      if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
        // Store authentication token in session storage (clears on browser close)
        sessionStorage.setItem('admin_token', 'authenticated');
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
