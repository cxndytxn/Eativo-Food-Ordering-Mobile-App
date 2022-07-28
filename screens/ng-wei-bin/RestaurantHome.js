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
  collection,
  doc,
  onSnapshot,
  query as firestoreQuery,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { Chip } from "react-native-paper";
import { getDistance } from "geolib";
import NoRestaurants from "../tan-xin-li/empty-states/NoRestaurants";

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

  const ListHeaderComponent = (props) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [uri, setUri] = useState("");
    const [locationPermission, setLocationPermission] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        onSnapshot(
          doc(firestore, "restaurants", currentUser.uid),
          (snapshot) => {
            if (snapshot !== undefined) {
              setUsername(snapshot.data()?.username);
              setAddress(snapshot.data()?.address);
              setUri(snapshot.data()?.imageUrl);
            }
          }
        );
      } else {
        setUsername("");
        setAddress("");
        setUri("");
      }
    });

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
