import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import VerticalRestaurantCard from "../../components/cards/VerticalRestaurantCard";
import Spacing from "../../components/views/Spacing";
import HorizontalRestaurantCard from "../../components/cards/HorizontalRestaurantCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../firebase";
import {
  query,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import { Chip } from "react-native-paper";
import RestOrderCard from "../../components/cards/RestOrderCard";

const FlatListItemSeparator = () => {
  return <View style={{ marginRight: 10 }} />;
};

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

const RestaurantHome = ({ navigation, route }) => {
  const [rests, setRests] = useState([]);
  const [nearbyRests, setNearbyRests] = useState([]);
  const [chip, setChip] = useState([]);
  const [selected, setSelected] = useState("All");
  const [orders, setOrders] = useState([]);
  const [email,setEmail]=useState("");
  const [contactNumber,setContactNumber]=useState("");
  const isFocused = useIsFocused();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [uri, setUri] = useState("");

  const ListHeaderComponent = (props) => {
    const navigation = useNavigation();

    const [locationPermission, setLocationPermission] = useState(false);
    var [counter,setCounter]=useState(0);



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
 
    },[isFocused]);



    const order = [];
  
    const FetchOrders = async () => {

      const docRef = doc(firestore, "restaurants", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {


        //restaurantId = docSnap.data().restaurantId;
        //restaurantId=auth.currentUser.uid
      setUsername(docSnap.data().username);
        setAddress(docSnap.data()?.address);
        setUri(docSnap.data()?.imageUrl);
      //  setEmail(docSnap.data().email);
      //  setContactNumber(docSnap.data().contactNumber);

        const ref = await getDocs(
          query(
            collection(firestore, "orders"),
            where("restaurantId", "==", auth.currentUser.uid),
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
            where("restaurantId", "==", auth.currentUser.uid),
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
            <Spacing marginBottom={5} />
            <Text style={styles.address}>
              {address === "" || address == undefined
                ? "Nice to see you!"
                : address}
            </Text>
          </View>
        </TouchableOpacity>
        <Spacing marginTop={10} />
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingLeft: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {chip.map((item, index) => {
            return (
              <Chip
                onPress={() => setSelected(item.category)}
                children={item.category}
                key={index}
                selected={selected === item.category ? true : false}
                selectedColor="black"
                textStyle={{
                  color: selected === item.category ? "black" : "#666666",
                }}
                style={{
                  marginRight: 5,
                  backgroundColor:
                    selected === item.category ? "#FFC529" : "lightgrey",
                }}
              />
            );
          })}
        </ScrollView>

        <Text style={styles.sectionHeader}>Incoming Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item, index }) => (
          <RestOrderCard
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

  return (
    <FlatList
      data={rests}
      renderItem={({ item, index }) => (
        <HorizontalRestaurantCard
          image={item.imageUrl}
          restaurantName={item.username}
          address={item.address}
          ratings={parseFloat(item.ratings).toFixed(1)}
          time={item.time}
          onPress={() =>
            navigation.navigate("DrawerNavigation", {
              screen: "Restaurant",
              params: {
                image: item.imageUrl,
                restaurantId: item.uid,
                restaurantName: item.username,
                address: item.address,
                ratings: item.ratings,
                time: item.time,
                contactNumber: item.contactNumber,
                email: item.email,
              },
            })
          }
          key={index}
        />
      )}
      scrollEnabled={true}
      ItemSeparatorComponent={VerticalFlatListItemSeparator}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalRestaurantCard: {
    paddingVertical: 10,
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
  address: {
    fontSize: 13,
    color: "#666666",
  },
});

export default RestaurantHome;
