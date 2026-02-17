import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../store/auth-context";

const WelcomeScreen: React.FC = () => {
  const { token } = useAuth();
  const [fetchedMessage, setFetchedMessage] = useState<string | null>(null);

  const getMessage = async () => {
    try {
      const url =
        process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL + "/message.json";
      const { data } = await axios.get(url, { params: { auth: token } });
      setFetchedMessage(data);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default WelcomeScreen;
