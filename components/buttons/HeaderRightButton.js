import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const HeaderRightButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DrawerNavigation", {
          screen: "Cart",
        });
      }}
    >
      <Ionicons name="cart" size={24} />
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
