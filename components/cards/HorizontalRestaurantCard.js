import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../views/Spacing";

const HorizontalRestaurantCard = ({
  image,
  restaurantName,
  address,
  ratings,
  time,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View>
        <Spacing marginTop={5} />
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Spacing marginBottom={5} />
        <View>
          <Text style={styles.address} numberOfLines={3} lineBreakMode="tail">
            {address}
          </Text>
        </View>
        <Spacing marginTop={5} />
        <View style={styles.contentContainer}>
          <View style={styles.ratings}>
            <Text style={styles.ratingsText}>{time} min</Text>
          </View>
          {/* <Spacing marginRight={10} />
          <View>
            <Text style={styles.time}>{time} min</Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 110,
    borderRadius: 20,
    marginRight: 10,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "#666666",
    fontSize: 12,
    maxWidth: "78%",
  },
  ratings: {
    borderRadius: 50,
    backgroundColor: "#FFC529",
    width: "30%",
    maxWidth: 60,
    paddingVertical: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingsText: {
    color: "black",
    fontSize: 12,
    padding: 2,
    fontWeight: "bold",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 12,
    color: "#666666",
  },
});

export default HorizontalRestaurantCard;
