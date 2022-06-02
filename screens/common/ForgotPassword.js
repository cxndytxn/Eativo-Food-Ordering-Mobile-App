import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import BackButton from "../../components/buttons/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import Spacing from "../../components/views/Spacing";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Toast from "react-native-toast-message";

const ResetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      Toast.show({
        type: "success",
        text1: "Please check your email to reset password.",
      });
    })
    .catch((error) =>
      Toast.show({
        type: "error",
        text1: error.message,
      })
    );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBackground}>
        <BackButton />
        <Image
          source={require("../../assets/images/forgot_password.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Spacing marginTop={30} />
        <Text style={styles.title}>Forgot password? Worry not!</Text>
        <Spacing marginTop={5} />
        <Text style={styles.subtitle}>
          Just tell us your email to reset your password.
        </Text>
        <Spacing marginBottom={40} />
        <RoundedTextInput
          placeholder="Enter your email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <Spacing marginTop={60} />
        <PrimaryButton onPress={() => ResetPassword(email)} text="Submit" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    width: "85%",
  },
  title: {
    textAlign: "left",
    width: "100%",
    maxWidth: 350,
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    textAlign: "left",
    width: "100%",
    maxWidth: 350,
    fontSize: 14,
    color: "#666666",
  },
  headerBackground: {
    alignItems: "center",
    width: "100%",
    height: 230,
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: "100%",
    height: 220,
    opacity: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default ForgotPassword;
