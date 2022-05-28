import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import Spacing from "../views/Spacing";

const CartMealCard = ({
  mealName,
  quantity,
  price,
  onPress,
  newPrice,
  setNewPrice,
  style,
  id,
}) => {
  const [qty, setQty] = useState(quantity);

  const RemoveMeal = () => {};

  const QuantityChanged = (num) => {
    if (num === 0) {
      RemoveMeal();
    }
    setQty(num);
    setNewPrice([(price / quantity) * num, num, id]);
  };

  useEffect(() => {
    setNewPrice([price, quantity, id]);
  }, []);

  return (
    <View style={[styles.container, style]} onPress={onPress}>
      <View style={styles.infoContainer}>
        <View>
          <Spacing marginTop={5} />
          <Text style={styles.restaurantName}>{mealName}</Text>
          <Spacing marginBottom={5} />
          <Text style={styles.address}>Quantity: {qty}</Text>
        </View>
        <Spacing marginTop={5} />
        <Text style={styles.price}>RM {parseFloat(newPrice).toFixed(2)}</Text>
      </View>
      <InputSpinner
        max={10}
        min={0}
        value={quantity}
        skin="clean"
        textColor="#FFAA3A"
        buttonTextColor="#FFAA3A"
        onChange={(num) => {
          QuantityChanged(num);
        }}
        fontSize={16}
        width="25%"
        height={30}
        style={{ alignSelf: "flex-end", elevation: 4 }}
        inputStyle={{ fontWeight: "bold" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
    maxWidth: "75%",
  },
});

export default CartMealCard;
