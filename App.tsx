import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation/Navigation";
import AuthContextProvider from "./store/auth-context";

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
};

export default App;
