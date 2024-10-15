import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isGettingAccessToken: boolean
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {



  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isGettingAccessToken, setIsGettingAccessToken] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
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
    <AuthContext.Provider value={{ accessToken, setAccessToken, isGettingAccessToken }}>
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
