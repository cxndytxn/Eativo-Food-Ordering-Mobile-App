import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const SecondaryButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, styles.elevation, styles.margin]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#61d5ff",
    width: "80%",
    maxWidth: 300,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  elevation: {
    elevation: 5,
    shadowColor: "#000000",
  },
  margin: {
    marginVertical: 5,
  },
});

export default SecondaryButton;
