import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import RestaurantOrderCard from "../../components/cards/RestaurantOrderCard";
import { auth, firestore } from "../../firebase";
import Spacing from "../../components/views/Spacing";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

const StaffHome = () => {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [uri, setUri] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
        }}
      />
    );
  };

  useEffect(() => {
    FetchOrders();

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        onSnapshot(doc(firestore, "staffs", currentUser.uid), (snapshot) => {
          if (snapshot !== undefined) {
            setUsername(snapshot.data()?.username);
            console.log(username);
            setUri(snapshot.data()?.imageUrl);
          }
        });
      } else {
        setUsername("");
        setUri("");
      }
    });
  }, [isFocused]);

  const FetchOrders = async () => {
    var uid = auth.currentUser?.uid;
    var restaurantId = "";
    const docRef = doc(firestore, "staffs", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const order = [];
      restaurantId = docSnap.data().restaurantId;
      const ref = await getDocs(
        query(
          collection(firestore, "orders"),
          where("restaurantId", "==", restaurantId),
          where("status", "==", "Order Received")
        )
      );
      ref.forEach((doc) => {
        order.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      const secondRef = await getDocs(
        query(
          collection(firestore, "orders"),
          where("restaurantId", "==", restaurantId),
          where("status", "==", "In Kitchen")
        )
      );
      secondRef.forEach((doc) => {
        order.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setOrders(order);
    }
  };

  return (
    <View style={styles.container}>
      <Spacing marginTop={10} />
      <TouchableOpacity
        style={styles.greetingContainer}
        onPress={() =>
          auth.currentUser
            ? navigation.navigate("Profile")
            : Toast.show({
                type: "error",
                text1: "Please log in to view user profile.",
              })
        }
      >
        <Image
          source={
            uri === "" || uri == undefined
              ? require("../../assets/images/default-user.jpg")
              : {
                  uri: uri,
                }
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.username}>
            Hello,{" "}
            {username === "" || username == undefined ? "Guest" : username}!
          </Text>
        </View>
      </TouchableOpacity>
      <Spacing marginBottom ={10} />
      <Text style={styles.sectionHeader}>Incoming Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item, index }) => (
          <RestaurantOrderCard
            orderId={item.key}
            date={item.date}
            time={item.time}
            status={item.status}
            totalPrice={item.total}
            key={index}
          />
        )}
        keyExtractor={(item) => item.index}
        ItemSeparatorComponent={FlatListItemSeparator}
        contentContainerStyle={{
          paddingBottom: 70,
          marginHorizontal: 10,
          paddingTop: 30,
        }}
        //ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: "#000000",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    margin: 10,
  },
  username: {
    fontSize: 16,
    color: "#FFC529",
    fontWeight: "bold",
  },
});

export default StaffHome;
