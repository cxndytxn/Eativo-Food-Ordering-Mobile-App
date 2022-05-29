import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Spacing from "../../../components/views/Spacing";

const NoCarts = () => {
  return (
    <View style={styles.container}>
      <Spacing marginTop={100} />
      <Image
        source={require("../../../assets/images/empty-cart.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Spacing marginTop={10} />
      <Text style={styles.text}>Oops, your cart is empty!</Text>
      <Spacing marginBottom={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    maxHeight: 470,
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

export default NoCarts;
