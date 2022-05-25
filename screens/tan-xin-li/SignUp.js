import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import Spacing from "../../components/views/Spacing";
import BackButton from "../../components/buttons/BackButton";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "Oops, input fields should not be left empty!",
    });
  };

  const SignUp = () => {
    if (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      username.trim().length > 0 &&
      confirmedPassword.trim().length > 0
    ) {
      if (password.trim() === confirmedPassword.trim()) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            Toast.show({
              type: "success",
              text1: "Signed up successfully!",
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
        Toast.show({
          type: "error",
          text1: "Password and confirmed password are not matching!",
        });
      }
    } else {
      ShowToast();
    }
  };

  const SignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBackground}>
          <BackButton />
          <Image
            source={require("../../assets/images/sign_up_banner.jpg")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <Spacing marginBottom={50} />
        <View style={styles.container}>
          <Text style={styles.bodyText}>Email</Text>
          <RoundedTextInput
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
          />
          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Username</Text>
          <RoundedTextInput
            onChangeText={(username) => setUsername(username)}
            placeholder="Username"
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              maxWidth: 350,
            }}
          >
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Password</Text>
              <RoundedTextInput
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={{ marginLeft: 10 }} />
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Confirmed Password</Text>
              <RoundedTextInput
                onChangeText={(confirmedPassword) =>
                  setConfirmedPassword(confirmedPassword)
                }
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
          </View>
          <Spacing marginTop={50} />
          <PrimaryButton onPress={SignUp} text="Sign Up" />
          <Spacing marginTop={30} />
          <SecondaryButton
            onPress={SignIn}
            descriptiveText={"Have an account? "}
            functionalText={"Sign In!"}
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
    paddingTop: 20,
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: "#f7fcff",
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
    height: 200,
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
