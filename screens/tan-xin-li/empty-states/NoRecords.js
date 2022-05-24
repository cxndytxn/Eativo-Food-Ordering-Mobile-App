import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../../../components/views/Spacing";

const NoRecords = ({ item }) => {
  return (
    <View style={styles.container}>
      <Spacing marginTop={130} />
      <Image
        source={require("../../../assets/images/no-records.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Spacing marginTop={30} />
      <Text style={styles.text}>Oops, nothing was found!</Text>
      <Spacing marginBottom={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
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

export default NoRecords;
