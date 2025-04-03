
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useCompanies } from './CompanyContext';

// Define types for our context
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  companyId?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsCompany: (companyId: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@costwise.com',
    password: 'password',
    role: 'admin' as const,
    avatar: '/avatar-1.png'
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@costwise.com',
    password: 'password',
    role: 'manager' as const,
    avatar: '/avatar-2.png'
  }
];

// Mock company credentials including real companies
// Real companies will have IDs starting from 100
const COMPANY_CREDENTIALS = [
  { companyId: '1', password: 'company1pass' },
  { companyId: '2', password: 'company2pass' },
  { companyId: '3', password: 'company3pass' },
  { companyId: '4', password: 'company4pass' },
  // Real companies (will be populated dynamically)
  { companyId: '100', password: 'aapl2024' },
  { companyId: '101', password: 'msft2024' },
  { companyId: '102', password: 'googl2024' },
  { companyId: '103', password: 'amzn2024' },
  { companyId: '104', password: 'meta2024' },
  { companyId: '105', password: 'tsla2024' },
  { companyId: '106', password: 'nvda2024' },
  { companyId: '107', password: 'jpm2024' },
  { companyId: '108', password: 'visa2024' },
  { companyId: '109', password: 'wmt2024' },
];

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { selectCompany } = useCompanies();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('costwise-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // If user has a companyId, automatically select that company
        if (parsedUser.companyId) {
          selectCompany(parsedUser.companyId).catch(err => {
            console.error('Failed to select company on init:', err);
          });
        }
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('costwise-user');
      }
    }
    setLoading(false);
  }, [selectCompany]);

  // Login function - for demo we'll just mock authentication
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('costwise-user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      setLoading(false);
      return true;
    }
    
    toast.error('Invalid email or password');
    setLoading(false);
    return false;
  };

  // Login as company
  const loginAsCompany = async (companyId: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const companyCredential = COMPANY_CREDENTIALS.find(
      c => c.companyId === companyId && c.password === password
    );
    
    if (companyCredential) {
      // Create a company user
      const companyUser: User = {
        id: `company-user-${companyId}`,
        name: `Company ${companyId}`,
        email: `company@${companyId}.com`,
        role: 'manager',
        companyId: companyId,
      };
      
      setUser(companyUser);
      localStorage.setItem('costwise-user', JSON.stringify(companyUser));
      
      // Select the company in the company context
      await selectCompany(companyId);
      
      toast.success(`Logged in successfully`);
      setLoading(false);
      return true;
    }
    
    toast.error('Invalid company credentials');
    setLoading(false);
    return false;
  };

  // Signup function - for demo we'll just simulate
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error('User with this email already exists');
      setLoading(false);
      return false;
    }
    
    // Create new user (in a real app this would be saved to a database)
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: 'viewer' as const
    };
    
    setUser(newUser);
    localStorage.setItem('costwise-user', JSON.stringify(newUser));
    toast.success('Account created successfully!');
    setLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('costwise-user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      loginAsCompany,
      signup, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
