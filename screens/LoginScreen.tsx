import { useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AutheticateFormData } from "../configs/types";
import { useAuth } from "../store/auth-context";
import { signInUser } from "../util/auth";

const LoginScreen: React.FC = () => {
  const { authenticate } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = async (credentials: AutheticateFormData) => {
    setIsAuthenticating(true);
    try {
      const userData = await signInUser(credentials);
      authenticate(userData.idToken);
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert(
        "Login Failed",
        "An error occurred while trying to log you in. Please check your credentials and try again.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
