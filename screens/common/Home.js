import React from "react";
import { View, Text } from "react-native";
import RestaurantCard from "../../components/cards/RestaurantCard";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>This is Home screen.</Text>
      <RestaurantCard />
    </View>
  );
};

export default Home;
