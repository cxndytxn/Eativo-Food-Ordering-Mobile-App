import React from "react";
import { TextInput, StyleSheet } from "react-native";

const RoundedTextInput = ({ placeholder, secureTextEntry, onChangeText }) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[styles.textInput, styles.margin, styles.elevation]}
      onChangeText={onChangeText}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "80%",
    maxWidth: 300,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  elevation: {
    elevation: 5,
    shadowColor: "#000000",
  },
  margin: {
    marginVertical: 5,
  },
});

export default RoundedTextInput;
