import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  grade?: number;
  points: number;
  completedLessons: string[];
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAccess: (grade: number) => boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  checkAccess: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('futureCoderUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('futureCoderUser');
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app, this would call an API
    try {
      // Mock successful login
      if (email && password) {
        const mockUser: User = {
          id: 'user-123',
          name: 'Estudante Exemplo',
          email,
          grade: 3, // Example grade
          points: 150,
          completedLessons: ['lesson-1', 'lesson-2'],
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('futureCoderUser', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('futureCoderUser');
  };
  
  const checkAccess = (grade: number): boolean => {
    // Check if user has access to this grade's content
    // This is just a simple example - in a real app, you'd check subscriptions
    return isAuthenticated && user?.grade === grade;
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};