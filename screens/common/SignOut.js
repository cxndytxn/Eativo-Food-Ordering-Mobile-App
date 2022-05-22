import React from "react";
import { StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Spacing from "../../components/views/Spacing";

const SignOut = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/logout.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Spacing marginTop={20} />
      <Text style={styles.text}>You're logged out!</Text>
      <Spacing marginTop={40} />
      <PrimaryButton onPress={() => navigation.navigate("Home")} text="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 200,
    maxHeight: 250,
    maxWidth: 250,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignOut;
