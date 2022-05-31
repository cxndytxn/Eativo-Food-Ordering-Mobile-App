import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const PrimaryButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, styles.elevation, styles.margin]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#FFC529",
    width: "100%",
    maxWidth: 350,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  elevation: {
    elevation: 4,
    shadowColor: "#000000",
  },
  margin: {
    marginVertical: 5,
  },
});

export default PrimaryButton;
