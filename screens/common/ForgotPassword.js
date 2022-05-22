import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import BackButton from "../../components/buttons/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import Spacing from "../../components/views/Spacing";

const ResetPassword = () => {};

const ForgotPassword = () => {
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
      <Spacing marginTop={30} />
      <Text style={styles.title}>Forgot password? Worry not!</Text>
      <Spacing marginTop={5} />
      <Text style={styles.subtitle}>
        Just tell us your email to reset your password.
      </Text>
      <Spacing marginBottom={40} />
      <RoundedTextInput placeholder="Enter your email" />
      <Spacing marginTop={60} />
      <PrimaryButton onPress={ResetPassword} text="Submit" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    width: "90%",
    maxWidth: 300,
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    textAlign: "left",
    width: "90%",
    maxWidth: 300,
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
