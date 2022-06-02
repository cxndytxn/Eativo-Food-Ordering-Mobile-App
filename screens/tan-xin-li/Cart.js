import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  LogBox,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spacing from "../../components/views/Spacing";
import CartMealCard from "../../components/cards/CartMealCard";
import {
  onSnapshot,
  query,
  collection,
  where,
  updateDoc,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Toast from "react-native-toast-message";
import NoCarts from "./empty-states/NoCarts";
import NotSignedIn from "./empty-states/NotSignedIn";

LogBox.ignoreAllLogs(true);

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
  const [newPrice, setNewPrice] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [time, setTime] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [cartIds, setCartIds] = useState([]);
  const [image, setImage] = useState("");
  const post = route?.params?.post;

  useEffect(() => {
    if (auth.currentUser != null) {
      const cartItems = [];
      onSnapshot(
        query(
          collection(firestore, "carts"),
          where("uid", "==", auth.currentUser.uid),
          where("status", "==", "In Cart")
        ),
        (querySnapshot) => {
          querySnapshot.forEach((cart) => {
            if (cartList.filter(() => !cartList.includes(cart.id))) {
              cartItems.push({
                ...cart.data(),
                key: cart.id,
              });
              setRestaurantId(cart.data().restaurantId);
              setCartList(cartItems);
            }
          });
        }
      );
    }
  }, [newPrice]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(firestore, "restaurants"),
        where("uid", "==", restaurantId)
      ),
      (querySnapshot) => {
        querySnapshot.forEach((restaurant) => {
          setRestaurantAddress(restaurant.data().address);
          var d = new Date();
          d.setHours(
            d.getHours(),
            d.getMinutes() + parseInt(restaurant.data().time),
            0,
            0
          );
          setTime([d.toLocaleDateString(), d.toLocaleTimeString()]);
          setRestaurantName(restaurant.data().username);
          setImage(restaurant.data().imageUrl);
        });
      }
    );
  }, [restaurantId]);

  const Order = () => {
    if (cartList.length == 0) {
      setIsPayable(false);
    } else {
      setIsPayable(true);
    }
    if (isPayable && post != undefined) {
      ConfirmOrder();
    } else if (isPayable && post == undefined) {
      Toast.show({
        type: "error",
        text1: "Kindly ensure payment field is filled!",
      });
    } else if (!isPayable && post != undefined) {
      Toast.show({
        type: "error",
        text1: "Error!",
      });
    } else if (!isPayable && post == undefined) {
      ShowToast();
    }
  };

  const ConfirmOrder = async () => {
    if (auth.currentUser != null) {
      const ids = [];
      const q = query(
        collection(firestore, "carts"),
        where("uid", "==", auth.currentUser.uid),
        where("status", "==", "In Cart")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((cart) => {
        UpdateDocument(cart);
        ids.push(cart.id);
        setCartIds(ids);
      });
    }
  };

  useEffect(() => {
    AddOrder();
  }, [cartIds]);

  const AddOrder = async () => {
    if (auth.currentUser != null) {
      await addDoc(collection(firestore, "orders"), {
        ids: cartIds,
        uid: auth.currentUser.uid,
        total: total,
        date: time[0],
        time: time[1],
        restaurantId: restaurantId,
        restaurantName: restaurantName,
        status: "Order Received",
        imageUrl: image,
      });
    }
  };

  const UpdateDocument = async (cart) => {
    var d = new Date();
    d.setHours(d.getHours(), d.getMinutes(), 0, 0);
    var date = d.toLocaleDateString();
    var time = d.toLocaleTimeString();
    await updateDoc(doc(firestore, "carts", cart.id), {
      status: "Order Received",
      date: date,
      time: time,
    })
      .catch((error) => {
        console.log(error.message);
      })
      .then(async () => {
        navigation.navigate("Home");
        Toast.show({
          type: "success",
          text1: "Your order had been received!",
        });
      });
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "You can't place an empty order!",
    });
  };

  useEffect(() => {
    Calculate();
  }, [newPrice]);

  const Calculate = async () => {
    if (auth.currentUser != null) {
      const cost = [];
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "carts"),
          where("uid", "==", auth.currentUser.uid),
          where("status", "==", "In Cart")
        )
      );
      querySnapshot.forEach((doc) => {
        cost.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      var value = cost.reduce(
        (totalCost, { total: itemCost }) => totalCost + parseFloat(itemCost),
        0
      );
      setTotal(value);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {auth.currentUser != null ? (
        <View style={{ flex: 1 }}>
          <Spacing marginTop={10} />
          {cartList.length != 0 ? (
            <View style={styles.infoSection}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="location-sharp"
                  size={24}
                  style={{ marginHorizontal: 10 }}
                />
                <Text>{restaurantAddress}</Text>
              </View>
              <Spacing marginBottom={10} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="card-sharp"
                  size={24}
                  style={{ marginLeft: 10 }}
                />
                <TextInput
                  value={post}
                  style={styles.textInput}
                  onPressIn={() =>
                    navigation.navigate("DrawerNavigation", {
                      screen: "Payment",
                    })
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
                <Text>Your orders may be ready for pick up at {time[1]}.</Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <Text style={styles.sectionHeader}>Meals</Text>
          <Spacing marginBottom={10} />
          <FlatList
            data={cartList}
            renderItem={({ item, index }) => (
              <CartMealCard
                mealId={item.mealId}
                mealName={item.mealName}
                price={item.total}
                quantity={item.quantity}
                setNewPrice={setNewPrice}
                key={index}
                remarks={item.remarks}
                id={item.key}
              />
            )}
            contentContainerStyle={styles.verticalRestaurantCard}
            ItemSeparatorComponent={VerticalFlatListItemSeparator}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={NoCarts}
          />
          <View style={styles.bottomSheet}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Total: RM {parseFloat(total).toFixed(2)}
            </Text>
            <View>
              <PrimaryButton onPress={() => Order()} text="Confirm Order" />
            </View>
          </View>
        </View>
      ) : (
        <NotSignedIn />
      )}
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
