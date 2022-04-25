import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const UnderlinedButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.underlined}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  underlined: {
    textDecorationLine: "underline",
    color: "#00a2ff",
    marginVertical: 5,
  },
});

export default UnderlinedButton;
