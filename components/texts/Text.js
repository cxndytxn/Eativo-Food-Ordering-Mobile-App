import React from "react";
import { Text, StyleSheet } from "react-native";

const BackButton = ({ text, style }) => {
  return <Text style={[style, styles.text]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "",
  },
});

export default BackButton;
