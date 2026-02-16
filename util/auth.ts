import axios from "axios";
import { AutheticateFormData, FirebaseAuthResponse } from "../configs/types";

const FIREBASE_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const api = axios.create({
  params: {
    key: FIREBASE_API_KEY,
  },
});

const authenticateUser = async (
  endpoint: string,
  credentials: AutheticateFormData,
): Promise<FirebaseAuthResponse> => {
  try {
    const { data } = await api.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:" + endpoint,
      {
        ...credentials,
        returnSecureToken: true,
      },
    );
    return data;
  } catch (error) {
    console.error(`Error during ${endpoint}:`, error);
    throw error;
  }
};

export const createUser = async (
  credentials: AutheticateFormData,
): Promise<FirebaseAuthResponse> => {
  return authenticateUser("signUp", credentials);
};

export const signInUser = async (
  credentials: AutheticateFormData,
): Promise<FirebaseAuthResponse> => {
  return authenticateUser("signInWithPassword", credentials);
};
