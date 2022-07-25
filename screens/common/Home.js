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
import { useNavigation } from "@react-navigation/native";
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
  return <View style={{ marginBottom: 10 }} />;
};

const Home = ({ navigation }) => {
  const [rests, setRests] = useState([]);
  const [nearbyRests, setNearbyRests] = useState([]);
  const [chip, setChip] = useState([]);
  const [selected, setSelected] = useState("All");

  const restaurants = [];
  //let nearbyRestaurants = [];

  useEffect(() => {
    let query;
    if (selected === "All")
      query = firestoreQuery(collection(firestore, "restaurants"));
    else if (selected === "Asian")
      query = firestoreQuery(
        collection(firestore, "restaurants"),
        where("category", "==", "Asian")
      );
    else if (selected === "Western")
      query = firestoreQuery(
        collection(firestore, "restaurants"),
        where("category", "==", "Western")
      );
    else if (selected === "Japanese")
      query = firestoreQuery(
        collection(firestore, "restaurants"),
        where("category", "==", "Japanese")
      );
    else if (selected === "Korean")
      query = firestoreQuery(
        collection(firestore, "restaurants"),
        where("category", "==", "Korean")
      );

    onSnapshot(query, (querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          restaurants.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setRests(restaurants);
      } else {
        setRests([]);
      }
    });
  }, [selected]);

  const ListHeaderComponent = (props) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [uri, setUri] = useState("");
    const [locationPermission, setLocationPermission] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        onSnapshot(doc(firestore, "users", currentUser.uid), (snapshot) => {
          if (snapshot !== undefined) {
            setUsername(snapshot.data()?.username);
            setAddress(snapshot.data()?.address);
            setUri(snapshot.data()?.imageUrl);
          }
        });
      } else {
        setUsername("");
        setAddress("");
        setUri("");
      }
    });

    useEffect(() => {
      // (async () => {
      //   let { status } = await Location.requestForegroundPermissionsAsync();
      //   if (status !== "granted") {
      //     Toast.show({
      //       type: "error",
      //       text1: "Location permission had been denied!",
      //     });
      //     setLocationPermission(false);
      //     return;
      //   } else {
      //     setLocationPermission(true);
      //     try {
      //       await Location.getCurrentPositionAsync({}).then((location) => {
      //         CalculateDistance(
      //           location.coords.latitude,
      //           location.coords.longitude
      //         );
      //       });
      //     } catch (error) {
      //       Toast.show({
      //         type: "error",
      //         text1: error.message,
      //       });
      //     }
      //   }
      // })();
      const query = firestoreQuery(collection(firestore, "categories"));
      const subscriber = onSnapshot(query, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (chip.find((item) => item.category === doc.data().category)) {
          } else {
            chip.push({
              category: doc.data().category,
            });
          }
        });
        setChip(chip);
      });

      return () => subscriber();
    }, [chip]);

    // const CalculateDistance = async (latitude, longitude) => {
    //   restaurants.forEach((restaurant) => {
    //     async () => {
    //       await Location.geocodeAsync(restaurant.address).then((locat) => {
    //         locat.find((coords) => {
    //           let restaurantCoords = {
    //             latitude: coords.latitude,
    //             longitude: coords.longitude,
    //           };
    //           let userCoords = {
    //             latitude: latitude,
    //             longitude: longitude,
    //           };
    //           let dist = getDistance(restaurantCoords, userCoords, 1);
    //           if (dist / 1000 < 1500) {
    //             nearbyRestaurants.push({
    //               address: restaurant.address,
    //               category: restaurant.category,
    //               contactNumber: restaurant.contactNumber,
    //               email: restaurant.email,
    //               imageUrl: restaurant.imageUrl,
    //               key: restaurant.key,
    //               ratings: restaurant.ratings,
    //               time: restaurant.time,
    //               type: restaurant.type,
    //               uid: restaurant.uid,
    //               username: restaurant.username,
    //               latitude: restaurantCoords.latitude,
    //               longitude: restaurantCoords.longitude,
    //             });
    //           }
    //         });
    //       });
    //     };
    //   });
    //   setNearbyRests(nearbyRestaurants);
    // };

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
        {locationPermission ? (
          <View>
            <Spacing marginBottom={20} />
            <Text style={styles.sectionHeader}>Restaurants Near You</Text>
            <Spacing marginBottom={10} />
            <FlatList
              data={nearbyRests}
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
                        restaurantId: item.uid,
                        restaurantName: item.restaurantName,
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
              keyExtractor={(item) => item.index}
              ItemSeparatorComponent={FlatListItemSeparator}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          </View>
        ) : (
          <></>
        )}
        <Spacing marginBottom={20} />
        <Text style={styles.sectionHeader}>Restaurants</Text>
        <Spacing marginTop={10} />
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
      contentContainerStyle={styles.verticalRestaurantCard}
      ItemSeparatorComponent={VerticalFlatListItemSeparator}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={NoRestaurants}
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

export default Home;
