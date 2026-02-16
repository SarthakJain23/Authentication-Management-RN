export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
};

export type AutheticateFormData = {
  email: string;
  password: string;
};

export type FirebaseAuthResponse = {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
};
