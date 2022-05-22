import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const SecondaryButton = ({ onPress, descriptiveText, functionalText }) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, styles.elevation, styles.margin]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={styles.descriptiveText}>{descriptiveText}</Text>
        <Text style={styles.functionalText}>{functionalText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    width: "90%",
    maxWidth: 300,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  descriptiveText: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
  },
  functionalText: {
    fontSize: 14,
    textAlign: "center",
    color: "#FFAA3A",
    fontWeight: "bold",
  },
  margin: {
    marginVertical: 5,
  },
});

export default SecondaryButton;
