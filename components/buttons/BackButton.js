import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.background, style]}
    >
      <Ionicons name="chevron-back-outline" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000000",
    position: "absolute",
    top: 15,
    left: 20,
    width: 40,
    height: 40,
    zIndex: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
});

export default BackButton;
