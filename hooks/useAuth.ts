import { AuthContextType } from "@/types";
import { AUTH_TOKEN_KEY } from "@/utils/constant";
import { useEffect, useState } from "react";

export const useAuth = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    setToken(storedToken);
    setIsAuthLoading(false);
  }, []);

  const isAuthenticated = !!token;

  const login = async (username: string, password: string) => {
    try {
      if (username === 'test' && password === 'password') {
        const mockToken = `mock-jwt-token-${crypto.randomUUID()}`;
        localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
        setToken(mockToken);
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication failed. Use "test" / "password".' };
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  return { isAuthenticated, login, logout, isAuthLoading };
};
