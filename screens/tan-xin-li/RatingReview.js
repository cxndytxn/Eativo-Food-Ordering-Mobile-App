import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import MapView, { MarkerAnimated } from "react-native-maps";
import ReviewsCard from "../../components/cards/ReviewsCard";
import Spacing from "../../components/views/Spacing";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const Data = [
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
  {
    image:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    username: "Erin",
    rating: 4,
    review: "The food was great!",
    date: "10-04-2022 01:00 AM",
  },
];

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const RatingReview = ({ route }) => {
  const {
    image,
    restaurantName,
    address,
    ratings,
    time,
    contactNumber,
    email,
  } = route.params;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    Geocode();

    return () => {};
  }, [latitude, longitude]);

  const Geocode = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      await Location.geocodeAsync(address).then((location) => {
        location.find((coords) => {
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        });
      });
    }
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.absoluteContainer}>
          <View style={styles.infoSection}>
            <View style={{ flex: 1 }}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>
            <View>
              <View style={styles.ratings}>
                <Text style={styles.ratingsText}>
                  {parseFloat(ratings).toFixed(1)}
                </Text>
              </View>
              <Text style={styles.time}>{time} min</Text>
            </View>
          </View>
        </View>
        <Spacing marginBottom={50} />
        <Text style={styles.sectionHeader}>Location</Text>
        <Spacing marginBottom={10} />
        <View style={styles.infoContainer}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapView}
              collapsable
              loadingIndicatorColor="#FFC529"
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitude,
                longitudeDelta: longitude,
              }}
              maxZoomLevel={25}
              minZoomLevel={15}
            >
              <MarkerAnimated
                title={restaurantName}
                description={address}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: latitude,
                  longitudeDelta: longitude,
                }}
              />
            </MapView>
          </View>
        </View>
        <Spacing marginBottom={30} />
        <Text style={styles.sectionHeader}>Info</Text>
        <Spacing marginBottom={10} />
        <View style={styles.infoContent}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="call-sharp"
              size={24}
              style={{ marginHorizontal: 10 }}
            />
            <TouchableOpacity
              onPress={() => {
                contactNumber != null ||
                contactNumber != undefined ||
                contactNumber != ""
                  ? Linking.openURL(`tel:${contactNumber}`)
                  : Toast.show({
                      type: "error",
                      text1:
                        "The restaurant had yet to input their contact number!",
                    });
              }}
            >
              <Text style={{ color: "#FFC529", fontWeight: "bold" }}>
                {contactNumber}
              </Text>
            </TouchableOpacity>
          </View>
          <Spacing marginBottom={10} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="mail-sharp"
              size={24}
              style={{ marginHorizontal: 10 }}
            />
            <TouchableOpacity
              onPress={() => {
                email != null || email != undefined || email != ""
                  ? Linking.openURL(`mailto:${email}`)
                  : Toast.show({
                      type: "error",
                      text1: "The restaurant had yet to input their email!",
                    });
              }}
            >
              <Text style={{ color: "#FFC529", fontWeight: "bold" }}>
                {email}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Spacing marginBottom={25} />
        <Text style={styles.sectionHeader}>Reviews</Text>
        <Spacing marginBottom={10} />
      </View>
    );
  };

  return (
    <FlatList
      data={Data}
      renderItem={({ item, index }) => (
        <ReviewsCard
          image={item.image}
          dateTime={item.date}
          rating={item.rating}
          review={item.review}
          username={item.username}
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
  verticalRestaurantCard: {
    paddingBottom: 10,
  },
  backgroundImage: {
    height: 200,
    width: "100%",
  },
  infoSection: {
    elevation: 4,
    shadowColor: "#000000",
    backgroundColor: "white",
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
    maxHeight: 25,
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
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 10,
  },
  mapContainer: {
    height: 200,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
  },
  mapView: {
    height: 200,
    width: "100%",
  },
  infoContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default RatingReview;
