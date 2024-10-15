import { authService } from '@/modules/auth/application/auth.service';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextProps {
  user: string | null;
  setUser: (email: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isGettingAccessToken: boolean
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {


  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isGettingAccessToken, setIsGettingAccessToken] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const authServiceImpl = authService(createAuthRepository())

      const data = await authServiceImpl.getToken()

      setAccessToken(data.accessToken);
      setIsGettingAccessToken(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setAccessToken(null);
      setIsGettingAccessToken(false);
    }
  };

  useEffect(() => {
    refreshAccessToken();
  }, [])


  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, isGettingAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
