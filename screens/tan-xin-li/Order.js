import {
  getDocs,
  query,
  collection,
  where,
  documentId,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import OrderCard from "../../components/cards/OrderCard";
import NoRecords from "./empty-states/NoRecords";
import { firestore, auth } from "../../firebase";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const Order = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [sum, setSum] = useState(0.0);

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {
    var list = [];
    const q = query(
      collection(firestore, "orders"),
      where("uid", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      list = doc.data().ids;
    });
    setOrders(list);
  };

  useEffect(() => {
    if (orders.length > 0) {
      GetMeals();
    }
  }, [orders]);

  const GetMeals = async () => {
    orders.forEach((order) => {
      GetCarts(order);
    });
    let summ = 0.0;
    orderList.forEach((order) => {
      summ = summ + Number(order.total).toFixed(2);
    });
    console.log(summ);
    setSum(summ);
  };

  const GetCarts = async (order) => {
    const q = query(
      collection(firestore, "carts"),
      where(documentId(), "==", order)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      GetList(doc, order);
    });
  };

  const GetList = async (doc, order) => {
    const arr = [];
    const que = query(
      collection(firestore, "restaurants"),
      where("uid", "==", doc.data().restaurantId)
    );
    const snaps = await getDocs(que);
    snaps.forEach((snap) => {
      arr.push({
        ...doc.data(),
        imageUrl: snap.data().imageUrl,
        restaurantName: snap.data().username,
        restaurantId: doc.data().restaurantId,
        cartId: order,
        key: doc.id,
      });
    });
    setOrderList(arr);
  };

  return (
    <FlatList
      data={orderList}
      renderItem={({ item, index }) => (
        <OrderCard
          image={item.imageUrl}
          dateTime={item.date + " " + item.time}
          restaurantName={item.restaurantName}
          price={sum}
          status={item.status}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Order Details",
              params: {
                image: item.imageUrl,
                restaurantName: item.restaurantName,
                restaurantId: item.restaurantId,
                price: sum,
                dateTime: item.date + " " + item.time,
                cartId: item.cartId,
                status: item.status,
              },
            })
          }
          key={index}
        />
      )}
      scrollEnabled={true}
      contentContainerStyle={styles.verticalRestaurantCard}
      ItemSeparatorComponent={VerticalFlatListItemSeparator}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={NoRecords}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 220,
    width: "100%",
  },
  verticalRestaurantCard: {
    paddingBottom: 15,
    paddingTop: 20,
  },
  infoSection: {
    backgroundColor: "black",
    borderRadius: 15,
    padding: 15,
    width: "90%",
    flexDirection: "row",
    position: "absolute",
    top: -35,
    alignSelf: "center",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    color: "#666666",
    fontSize: 12,
  },
  ratings: {
    borderRadius: 50,
    backgroundColor: "#FFC529",
    maxWidth: 45,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingsText: {
    color: "black",
    fontSize: 12,
    padding: 2,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#666666",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
  },
  absoluteContainer: {
    position: "relative",
  },
});

export default Order;
