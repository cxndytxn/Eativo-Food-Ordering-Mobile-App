import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Spacing from "../../../components/views/Spacing";

const NoRestaurants = () => {
  return (
    <View style={styles.container}>
      <Spacing marginTop={25} />
      <Image
        source={require("../../../assets/images/empty-box.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Spacing marginTop={10} />
      <Text style={styles.text}>Oops, no restaurants were found!</Text>
      <Spacing marginBottom={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
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

export default NoRestaurants;
