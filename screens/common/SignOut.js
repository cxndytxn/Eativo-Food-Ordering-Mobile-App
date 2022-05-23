import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
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
      <View style={styles.contentContainer}>
        <Spacing marginTop={20} />
        <Text style={styles.text}>You're logged out!</Text>
        <Spacing marginTop={40} />
        <PrimaryButton
          onPress={() => navigation.navigate("Home")}
          text="Home"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "85%",
  },
  image: {
    borderRadius: 200,
    maxHeight: 250,
    maxWidth: 250,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SignOut;
