import React, { useState } from "react";
import * as Location from "expo-location";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const ManagerSignUp = () => {
  //Use geocodeasync from expo-location to get latitude and longitude from restaurant address, then store lat, lng to Firestore
  //along with the restaurant's record

  const [address, setAddress] = useState("");

  const SignUp = async () => {
    //Example of using geocodeasync
    if (address != "") {
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
          });
        });
      }
    }
  };

  return (
    <SafeAreaView>
      <TextInput onChangeText={(address) => setAddress(address)} />
      <Button onPress={SignUp} title="Sign Up" />
    </SafeAreaView>
  );
};

export default ManagerSignUp;
