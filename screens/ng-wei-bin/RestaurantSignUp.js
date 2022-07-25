import React, { useState } from "react";
import * as Location from "expo-location";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { auth, firestore } from "../../firebase";

const RestaurantSignUp = () => {
  //Use geocodeasync from expo-location to get latitude and longitude from restaurant address, then store lat, lng to Firestore
  //Refer to data types of restaurants in Firebase (McDonald's) BUT DON'T MODIFY

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [category, setCategory] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);

  const SignUp = async () => {
    //Get all the entered inputs from UI, if none is empty, then create a new restaurant account
    if (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      username.trim().length > 0 &&
      category.trim().length > 0 &&
      address.trim().length > 0 &&
      preparationTime.trim().length > 0 &&
      confirmedPassword.trim().length > 0
    ) {
      //Example of using geocodeasync
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        await Location.geocodeAsync(address).then((locat) => {
          locat.find((coords) => {
            Toast.show({
              type: "success",
              text1: "Latitude: " + coords.latitude,
              text2: "Longitude: " + coords.longitude,
            });
            console.log(coords.latitude);
            console.log(coords.longitude);

            //Set lat and lng to useState
            setLat(coords.latitude);
            setLng(coords.longitude);

            //Start creating new restaurant account
            if (
              password.trim() === confirmedPassword.trim() &&
              lat !== 0.0 &&
              lng !== 0.0
            ) {
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                  const user = userCredentials.user;
                  CreateUserDocument(email, username, user.uid);
                  Toast.show({
                    type: "success",
                    text1: "Signed up successfully!",
                  });

                  navigation.navigate("RestaurantNavigation", {
                    screen: "Home",
                  });
                })
                .catch((error) => {
                  Toast.show({
                    type: "error",
                    text1: error.message,
                  });
                });
            } else {
              Toast.show({
                type: "error",
                text1: "Password and confirmed password are not matching!",
              });
            }
          });
        });
      }
    }
  };

  //Restaurant object!!
  const CreateUserDocument = async (email, username, uid) => {
    await setDoc(doc(firestore, "restaurants", uid), {
      uid: uid,
      username: username,
      email: email,
      imageUrl: "",
      ratings: 0,
      type: "restaurant",
      time: preparationTime,
      address: address,
      lat: lat,
      lng: lng,
      category: category,
      contactNumber: "",
    });
  };

  //Write your UI codes here, then bind them with all useState(s) I written
  //Can refer to SignUp.js
  return (
    <SafeAreaView>
      <TextInput onChangeText={(address) => setAddress(address)} />
      <Button onPress={SignUp} title="Sign Up" />
    </SafeAreaView>
  );
};

export default RestaurantSignUp;
