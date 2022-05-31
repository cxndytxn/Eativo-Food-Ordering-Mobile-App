import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import Carousel from "react-native-snap-carousel/";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { ParallaxImage } from "react-native-snap-carousel";
import { getDistance } from "geolib";

const { width: screenWidth } = Dimensions.get("window");

const Map = () => {
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [mapLat, setMapLat] = useState(0.0);
  const [mapLng, setMapLng] = useState(0.0);
  const [restaurants, setRestaurants] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  useEffect(() => {
    GetLocation();

    return () => {};
  }, [latitude, longitude]);

  const GetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      await Location.getCurrentPositionAsync({}).then((location) => {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      });
    }
  };

  useEffect(() => {
    GetDoc().then(CalculateDistance());
  }, [restaurants]);

  const GetDoc = async () => {
    const rests = [];
    const querySnapshot = await getDocs(collection(firestore, "restaurants"));
    querySnapshot.forEach((doc) => {
      rests.push({ ...doc.data(), key: doc.id });
    });
    setRestaurants(rests);
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setMapLat(item.lat);
          setMapLng(item.lng);
        }}
        key={index}
      >
        <ParallaxImage
          source={{ uri: item.imageUrl }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View
          style={{
            backgroundColor: "white",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {item.username}
          </Text>
          <Text style={{ color: "#999999", fontSize: 12 }}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CalculateDistance = () => {
    const nr = [];
    restaurants.forEach((restaurant) => {
      var restaurantCoords = {
        latitude: restaurant.lat,
        longitude: restaurant.lng,
      };
      var userCoords = { latitude: latitude, longitude: longitude };
      let dist = getDistance(restaurantCoords, userCoords, 1);
      if (dist / 1000 < 10) {
        nr.push({
          ...restaurant,
          key: restaurant.key,
        });
        setNearbyRestaurants(nr);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 100 }}
        maxZoomLevel={25}
        minZoomLevel={15}
        showsUserLocation
        initialRegion={{
          latitude: latitude,
          latitudeDelta: latitude,
          longitude: longitude,
          longitudeDelta: longitude,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitude,
            longitudeDelta: longitude,
          }}
          pinColor="#FFC529"
        />
        {nearbyRestaurants.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.lat,
              latitudeDelta: marker.lat,
              longitude: marker.lng,
              longitudeDelta: marker.lng,
            }}
            title={marker.username}
            description={marker.address}
          >
          </Marker>
        ))}
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 10,
          marginBottom: 30,
        }}
      >
        <Carousel
          data={nearbyRestaurants}
          renderItem={renderItem}
          sliderHeight={250}
          sliderWidth={screenWidth}
          itemWidth={220}
          horizontal
          hasParallaxImages
        />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 220,
    height: 220,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    resizeMode: "contain",
  },
});