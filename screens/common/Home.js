import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, Image } from "react-native";
import VerticalRestaurantCard from "../../components/cards/VerticalRestaurantCard";
import Spacing from "../../components/views/Spacing";
import HorizontalRestaurantCard from "../../components/cards/HorizontalRestaurantCard";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  query as firestoreQuery,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    restaurantName: "McDonald's",
    address: "Bkt Bintang, Kuala Lumpur",
    ratings: 4.5,
    time: 25,
  },
  {
    image:
      "https://www.restaurant-hospitality.com/sites/restaurant-hospitality.com/files/styles/article_featured_standard/public/Kensfoods_breakoutflavors_690784532.jpg?itok=DkJdjGlZ",
    restaurantName: "The Italian Flavor",
    address: "Bkt Bintang, Kuala Lumpur",
    ratings: 4.5,
    time: 25,
  },
  {
    image:
      "https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg",
    restaurantName: "Burger Scientist",
    address: "Bkt Bintang, Kuala Lumpur",
    ratings: 4.5,
    time: 25,
  },
];

const FlatListItemSeparator = () => {
  return <View style={{ marginRight: 10 }} />;
};

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const ListHeaderComponent = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [uri, setUri] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [location, setLocation] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      onSnapshot(doc(firestore, "users", currentUser.uid), (snapshot) => {
        setUsername(snapshot.data().username);
        setAddress(snapshot.data()?.address);
        setUri(snapshot.data()?.imageUrl);
      });
    } else {
      setUsername("");
      setAddress("");
      setUri("");
    }
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Location permission had been denied!",
        });
        setLocationPermission(false);
        return;
      } else {
        setLocationPermission(true);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Spacing marginTop={10} />
      {locationPermission ? (
        <View style={styles.greetingContainer}>
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
        </View>
      ) : (
        <></>
      )}
      <Spacing marginBottom={20} />
      <Text style={styles.sectionHeader}>Restaurants Near You</Text>
      <Spacing marginBottom={10} />
      <FlatList
        data={Data}
        renderItem={({ item, index }) => (
          <VerticalRestaurantCard
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
                  restaurantName: item.username,
                  address: item.address,
                  ratings: item.ratings,
                  time: item.time,
                },
              })
            }
            key={index}
          />
        )}
        ItemSeparatorComponent={FlatListItemSeparator}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
      <Spacing marginBottom={20} />
      <Text style={styles.sectionHeader}>All Restaurants</Text>
      <Spacing marginTop={10} />
    </View>
  );
};

const Home = ({ navigation }) => {
  const [rests, setRests] = useState([]);

  const restaurants = [];

  useEffect(() => {
    const query = firestoreQuery(collection(firestore, "restaurants"));
    const subscriber = onSnapshot(query, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        restaurants.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setRests(restaurants);
    });

    return () => subscriber();
  }, []);

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
                restaurantName: item.username,
                address: item.address,
                ratings: item.ratings,
                time: item.time,
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
    color: "#FFAA3A",
    fontWeight: "bold",
  },
  address: {
    fontSize: 13,
    color: "#666666",
  },
});

export default Home;
