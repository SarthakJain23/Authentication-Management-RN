import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/styles";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useAuth } from "../store/auth-context";

const Stack = createNativeStackNavigator();

const AuthenticatedStack: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            size={24}
            color={tintColor}
            onPress={logout}
          />
        ),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
