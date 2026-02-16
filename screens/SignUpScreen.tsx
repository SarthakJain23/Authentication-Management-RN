import { useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AutheticateFormData } from "../configs/types";
import { useAuth } from "../store/auth-context";
import { createUser } from "../util/auth";

const SignUpScreen: React.FC = () => {
  const { authenticate } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signUpHandler = async (credentials: AutheticateFormData) => {
    setIsAuthenticating(true);
    try {
      const userData = await createUser(credentials);
      authenticate(userData.idToken);
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert(
        "Sign Up Failed",
        "An error occurred while trying to create your account. Please check your information and try again.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
};

export default SignUpScreen;
