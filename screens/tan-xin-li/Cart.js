import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spacing from "../../components/views/Spacing";
import CartMealCard from "../../components/cards/CartMealCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

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
  const [isPayable, setIsPayable] = useState(true);
  const [cartList, setCartList] = useState([]);
  const [newTotal, setNewTotal] = useState(0.0);
  const post = route?.params?.post;

  useEffect(() => {
    var sum;
    cartList.forEach((cart) => {
      sum += parseFloat(cart.total).toFixed(2);
      console.log(sum);
      setNewTotal(sum);
    });
  }, [newTotal]);

  useEffect(() => {
    if (auth.currentUser != null) {
      var sum;
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
            sum += parseFloat(cart.data().total).toFixed(2);
            setNewTotal(sum);
            setCartList(cartList);
          });
          if (cartList.length == 0) {
            setIsPayable(false);
          }
        }
      );
    } else {
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
            mealName={item.mealName}
            price={parseFloat(item.total).toFixed(2)}
            quantity={item.quantity}
            setNewTotal={setNewTotal}
            key={index}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.verticalRestaurantCard}
        ItemSeparatorComponent={VerticalFlatListItemSeparator}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomSheet}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Total: RM {parseFloat(newTotal).toFixed(2)}
        </Text>
        <View>
          <PrimaryButton text="Order" onPress={Order} />
        </View>
      </View>
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
