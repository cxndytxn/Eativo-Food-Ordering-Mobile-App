import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import Spacing from "../views/Spacing";
import { firestore } from "../../firebase";
import { updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import RoundedTextInput from "../textInputs/RoundedTextInput";
import Toast from "react-native-toast-message";

const CartMealCard = ({
  mealId,
  mealName,
  quantity,
  price,
  setNewPrice,
  remarks,
  id,
}) => {
  const [qty, setQty] = useState(quantity);
  const [remark, setRemark] = useState(remarks);

  const AddBackQuantity = async () => {
    const docRef = doc(firestore, "meals", mealId);
    const docSnap = await getDoc(docRef);
    var originalQuantity;
    if (docSnap.exists()) {
      originalQuantity = docSnap.data().quantity;
      await updateDoc(doc(firestore, "meals", mealId), {
        quantity: parseInt(originalQuantity + qty),
      }).then(() => {
        RemoveMeal();
      });
    }
  };

  const RemoveMeal = async () => {
    await deleteDoc(doc(firestore, "carts", id)).then(
      Toast.show({
        type: "info",
        text1: mealName + " had been removed from your cart!",
      })
    );
    setNewPrice();
  };

  const QuantityChanged = (num) => {
    if (num === 0) {
      AddBackQuantity();
    } else {
      setQty(num);
      UpdateDoc(num);
      setNewPrice((price / quantity) * num);
    }
  };

  const UpdateDoc = async (num) => {
    await updateDoc(doc(firestore, "carts", id), {
      total: (price / quantity) * num,
      quantity: num,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <Spacing marginTop={5} />
          <Text style={styles.restaurantName}>{mealName}</Text>
          <Spacing marginBottom={5} />
          <Text style={styles.address}>Quantity: {qty}</Text>
        </View>
        <Spacing marginTop={5} />
        <Text style={styles.price}>RM {parseFloat(price).toFixed(2)}</Text>
        <View style={{ flex: 1, width: "100%" }}>
          <RoundedTextInput
            value={remark === "" ? "" : remark}
            placeholder="Remarks"
            onChangeText={(remark) => {
              setRemark(remark);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <InputSpinner
          max={10}
          min={0}
          value={quantity}
          skin="clean"
          textColor="#FFC529"
          buttonTextColor="#FFC529"
          onChange={(num) => {
            QuantityChanged(num);
          }}
          fontSize={16}
          width="60%"
          height={30}
          style={{ alignSelf: "flex-end", elevation: 4 }}
          inputStyle={{ fontWeight: "bold" }}
        />
      </View>
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

export default CartMealCard;
