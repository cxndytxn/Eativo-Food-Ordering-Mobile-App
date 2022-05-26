import React from "react";
import { TextInput, StyleSheet } from "react-native";

const RoundedTextInput = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  editable,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[styles.textInput, styles.margin, styles.elevation]}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    maxWidth: 350,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  margin: {
    marginVertical: 5,
  },
});

export default RoundedTextInput;
