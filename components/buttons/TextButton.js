import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TextButton = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.underlined}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  underlined: {
    color: "#FFC529",
    marginVertical: 5,
    fontWeight: "bold",
  },
});

export default TextButton;
