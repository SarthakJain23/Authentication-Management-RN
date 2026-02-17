import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to load token from AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const authenticate = (newToken: string) => {
    setToken(newToken);
    AsyncStorage.setItem("authToken", newToken).catch((error) => {
      console.error("Failed to save token to AsyncStorage:", error);
    });
  };

  const logout = () => {
    setToken("");
    AsyncStorage.removeItem("authToken").catch((error) => {
      console.error("Failed to remove token from AsyncStorage:", error);
    });
  };

  const value: AuthContextType = {
    token,
    isAuthenticated: Boolean(token),
    authenticate,
    logout,
  };

  if (isLoading) {
    return <AppLoading />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
