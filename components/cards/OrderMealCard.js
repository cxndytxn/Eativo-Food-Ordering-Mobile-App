import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Spacing from "../views/Spacing";

const OrderMealCard = ({ mealName, quantity, remarks }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <Spacing marginTop={5} />
          <Text style={styles.restaurantName}>{mealName}</Text>
          <Spacing marginBottom={5} />
          <Text style={styles.address}>Quantity: {quantity}</Text>
        </View>
        <Spacing marginTop={5} />
        {remarks != "" ? (
          <View style={{ flex: 1, width: "100%" }}>
            <Text>Remarks: {remarks}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  image: {
    width: 150,
    height: 110,
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
    color: "#FFC529",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "space-between",
    flex: 2,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "#666666",
    fontSize: 12,
    maxWidth: "75%",
  },
});

export default OrderMealCard;
