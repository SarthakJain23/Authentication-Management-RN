import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../store/auth-context";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";

const Navigation: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
