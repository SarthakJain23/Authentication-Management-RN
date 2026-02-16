import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";
import { Credentials, CredentialsInvalid } from "./AuthContent";
import Input from "./Input";

interface AuthFormProps {
  isLogin: boolean;
  credentialsInvalid: CredentialsInvalid;
  onSubmit: (credentials: Credentials) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  credentialsInvalid,
  onSubmit,
}) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <Input
        label="Email Address"
        onChangeText={updateInputValueHandler.bind(this, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          onChangeText={updateInputValueHandler.bind(this, "confirmEmail")}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          isInvalid={emailsDontMatch}
        />
      )}
      <Input
        label="Password"
        onChangeText={updateInputValueHandler.bind(this, "password")}
        secureTextEntry
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onChangeText={updateInputValueHandler.bind(this, "confirmPassword")}
          secureTextEntry
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});

export default AuthForm;
