import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import RoundedTextInput from "../components/textInputs/RoundedTextInput";
import UnderlinedButton from "../components/buttons/UnderlinedButton";
import Spacing from "../components/views/Spacing";
import HeaderText from "../components/texts/HeaderText";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    if (email.trim().length > 0 && password.trim().length > 0) {
      navigation.navigate("Home", {
        email: email,
        password: password,
      });
    } else {
      ShowToast();
    }
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "Oops, email and password shouldn't be empty!",
    });
  };

  const SignUp = () => {
    navigation.navigate("Sign Up");
  };

  const ForgotPassword = () => {
    navigation.navigate("Forgot Password");
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar backgroundColor="#fff" style="auto" />
      <View style={styles.container}>
        <HeaderText text="Food Haven" />
        <Image
          source={require("../assets/youfoodIcon.png")}
          style={[styles.logo, styles.margin]}
        />
        <Spacing marginTop={30} />
        <Text style={styles.bodyText}>Email</Text>
        <RoundedTextInput
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
        />
        <Spacing marginTop={10} />
        <Text style={styles.bodyText}>Password</Text>
        <RoundedTextInput
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Spacing marginTop={10} />
        <UnderlinedButton onPress={ForgotPassword} text="Forgot Password?" />
        <Spacing marginTop={50} />
        <PrimaryButton onPress={Login} text="Sign In" />
        <Text style={{ fontStyle: "italic", marginVertical: 10 }}>Or</Text>
        <SecondaryButton onPress={SignUp} text="Sign Up" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyText: {
    width: "80%",
    maxWidth: 300,
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 5,
    shadowColor: "#000000",
  },
  logo: {
    height: 100,
    width: 100,
  },
  margin: {
    marginVertical: 5,
  },
});

export default SignIn;
