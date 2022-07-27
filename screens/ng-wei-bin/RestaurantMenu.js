import React from "react";
import { View, Text,StyleSheet, TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";

const RestaurantMenu = () => {
  return (
    <View>
      <Text>Restaurant Menu Screen</Text>

    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    right: 10,
    left: 10,
    position:'absolute',
    bottom: 10,
  },

  addbutton: {
    backgroundColor:'white',
    width: 45,
    height: 45,
    borderRadius: 45,
  }

})

export default RestaurantMenu;