import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import TextButton from "../../components/buttons/TextButton";
import Spacing from "../../components/views/Spacing";
import BackButton from "../../components/buttons/BackButton";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    if (email.trim().length > 0 && password.trim().length > 0) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          Toast.show({
            type: "success",
            text1: "Signed in successfully!",
          });
          navigation.navigate("DrawerNavigation", { screen: "Home" });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: error.message,
          });
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
    navigation.navigate("SignUp");
  };

  const ForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBackground}>
          <BackButton />
          <Image
            source={require("../../assets/images/sign_in_banner.png")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <Spacing marginBottom={35} />
        <View style={styles.container}>
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
          <View style={{ width: "95%" }}>
            <TextButton
              onPress={ForgotPassword}
              text="Forgot Password?"
              style={styles.textButton}
            />
          </View>
          <Spacing marginTop={50} />
          <PrimaryButton onPress={Login} text="Sign In" />
          <Spacing marginTop={50} />
          <SecondaryButton
            onPress={SignUp}
            descriptiveText={"Don't have an account? "}
            functionalText={"Sign Up!"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackground: {
    alignItems: "center",
    width: "100%",
    height: 220,
    backgroundColor: "black",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container: {
    flex: 2,
    width: "85%",
    maxWidth: 350,
    maxHeight: 670,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    alignSelf: "flex-end",
  },
  image: {
    width: "100%",
    height: 220,
    opacity: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bodyText: {
    width: "100%",
    maxWidth: 350,
    fontSize: 14,
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
    height: 150,
    width: "100%",
    borderRadius: 20,
  },
  margin: {
    marginVertical: 5,
  },
});

export default SignIn;
