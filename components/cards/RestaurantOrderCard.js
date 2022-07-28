import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../views/Spacing";

const RestaurantOrderCard = ({ orderId, totalPrice, status, date, time }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("StaffNavigation", {
          screen: "Order Details",
          params: {
            orderId: orderId,
          },
        });
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>ID: {orderId}</Text>
        <View style={styles.ratings}>
          <Text style={styles.ratingsText}>{status}</Text>
        </View>
      </View>
      <Spacing marginTop={15} />
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", color: "#F95F62" }}>
          RM {parseFloat(totalPrice).toFixed(2)}
        </Text>
        <Text style={{ color: "grey" }}>
          {date} {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  ratings: {
    borderRadius: 50,
    backgroundColor: "#FFC529",
    width: "30%",
    maxWidth: 110,
    paddingVertical: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingsText: {
    color: "white",
    fontSize: 12,
    padding: 2,
    fontWeight: "bold",
  },
});

export default RestaurantOrderCard;
