import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Spacing from "../../../components/views/Spacing";

const NotSignedIn = () => {
  return (
    <View style={styles.container}>
      <Spacing marginTop={150} />
      <Image
        source={require("../../../assets/images/access-denied.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Spacing marginTop={10} />
      <Text style={styles.text}>Oops, you're not signed in!</Text>
      <Spacing marginBottom={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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

export default NotSignedIn;
