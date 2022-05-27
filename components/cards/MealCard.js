import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../views/Spacing";

const MealCard = ({
  image,
  mealName,
  description,
  price,
  onPress,
  style,
  quantity,
  greyOut,
}) => {
  return (
    <TouchableOpacity
      style={[style, { opacity: greyOut ? 0.3 : 1 }]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <View>
            <Spacing marginTop={5} />
            <Text style={styles.restaurantName}>{mealName}</Text>
            <Spacing marginBottom={5} />
            <Text style={styles.address} numberOfLines={3}>
              {description}
            </Text>
          </View>
          <Spacing marginTop={5} />
          <Text style={styles.quantity}>x{quantity}</Text>
          <Text style={styles.price}>RM {parseFloat(price).toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  mealName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#666666",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    color: "#FFAA3A",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "space-between",
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "#666666",
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "grey",
    opacity: 0.3,
  },
  quantity: {
    fontSize: 14,
    color: "#666666",
  },
});

export default MealCard;
