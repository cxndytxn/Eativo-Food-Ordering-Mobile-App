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
    backgroundColor: "#FFAA3A",
    width: "90%",
    maxWidth: 300,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
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
