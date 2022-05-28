import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spacing from "../../components/views/Spacing";
import CartMealCard from "../../components/cards/CartMealCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {
  onSnapshot,
  query,
  collection,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { set } from "react-native-reanimated";

const VerticalFlatListItemSeparator = () => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
      }}
    />
  );
};

const Cart = ({ navigation, route }) => {
  //move the update firestore function to CartMealCard.js, create another screen for adjusting quantity or showing summary
  const [isPayable, setIsPayable] = useState(true);
  const [cartList, setCartList] = useState([]);
  //const [newTotal, setNewTotal] = useState(0.0);
  const [newPrice, setNewPrice] = useState([]);
  const [sumP, setSumP] = useState(0.0);
  const post = route?.params?.post;

  useEffect(() => {
    UpdateDoc();
  }, [newPrice]);

  const UpdateDoc = async () => {
    await updateDoc(doc(firestore, "carts", newPrice[2]), {
      total: newPrice[0],
      quantity: newPrice[1],
    });
  };

  useEffect(() => {
    if (auth.currentUser != null) {
      var sum = 0.0;
      var price = 0.0;
      onSnapshot(
        query(
          collection(firestore, "carts"),
          where("uid", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          querySnapshot.forEach((cart) => {
            const cartList = [];
            cartList.push({
              ...cart.data(),
              key: cart.id,
            });
            setCartList(cartList);
            // price = parseFloat(cart.data().total).toFixed(2);
            // sum = parseFloat(sum + price).toFixed(2);
            // setSumP(sum);
            // setNewTotal(sumP);
          });
          // setNewTotal(parseFloat(sum).toFixed(2));
          if (cartList.length == 0) {
            setIsPayable(false);
          }
          //  else {
          //   cartList.forEach((cart) => {
          //     sum = newTotal + cart.total;
          //     setNewTotal(sum);
          //   });
          // }
        }
      );
    }
  }, []);

  const Order = () => {
    if (isPayable) {
      navigation.navigate("Check Out");
    } else {
      ShowToast();
    }
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "You can't place an empty order!",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Spacing marginTop={10} />
      <View style={styles.infoSection}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="location-sharp"
            size={24}
            style={{ marginHorizontal: 10 }}
          />
          <Text>Restaurant Address</Text>
        </View>
        <Spacing marginBottom={10} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="card-sharp" size={24} style={{ marginLeft: 10 }} />
          <TextInput
            value={post}
            style={styles.textInput}
            onPressIn={() =>
              navigation.navigate("DrawerNavigation", { screen: "Payment" })
            }
            placeholder="Card Number"
          />
        </View>
        <Spacing marginBottom={10} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="time-sharp"
            size={24}
            style={{ marginHorizontal: 10 }}
          />
          <Text>Your meal will be ready around 02:50PM.</Text>
        </View>
      </View>
      <Text style={styles.sectionHeader}>Meals</Text>
      <Spacing marginBottom={10} />
      <FlatList
        data={cartList}
        renderItem={({ item, index }) => (
          <CartMealCard
            index={index}
            mealName={item.mealName}
            price={parseFloat(item.total).toFixed(2)}
            quantity={item.quantity}
            setNewPrice={setNewPrice}
            newPrice={newPrice}
            key={index}
            id={item.key}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.verticalRestaurantCard}
        ItemSeparatorComponent={VerticalFlatListItemSeparator}
        showsVerticalScrollIndicator={false}
      />
      {/* <View style={styles.bottomSheet}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Total: RM {newTotal}
        </Text> */}
      <View style={{ alignSelf: "center" }}>
        <PrimaryButton text="Order" onPress={Order} />
      </View>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "lightgrey",
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});

export default Cart;
