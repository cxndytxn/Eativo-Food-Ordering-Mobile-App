import React, { useState } from "react";
import * as Location from "expo-location";
import { Button, StyleSheet, ScrollView, View, Image,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { auth, firestore } from "../../firebase";
import BackButton from "../../components/buttons/BackButton";
import Spacing from "../../components/views/Spacing";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import TextButton from "../../components/buttons/TextButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";

const RestaurantSignUp = () => {
  //Use geocodeasync from expo-location to get latitude and longitude from restaurant address, then store lat, lng to Firestore
  //Refer to data types of restaurants in Firebase (McDonald's) BUT DON'T MODIFY

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [category, setCategory] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const navigation = useNavigation();



  const SignUp = async () => {
    //Get all the entered inputs from UI, if none is empty, then create a new restaurant account
    if (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      username.trim().length > 0 &&
      category.trim().length > 0 &&
      address.trim().length > 0 &&
      contactNumber.trim().length > 0 &&
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
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mpma-ttn.appspot.com/o/restaurants%2Fdefaultlogo.jpg?alt=media&token=1838b53b-f0fe-40e3-90cd-ccfe99c7cad8",
      ratings: 0,
      type: "restaurant",
      time: preparationTime,
      address: address,
      lat: lat,
      lng: lng,
      category: category,
      contactNumber: contactNumber,
    });
  };

  //Write your UI codes here, then bind them with all useState(s) I written
  //Restaurant Name uses username field cause shared within Firestore
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBackground}>
          <BackButton />
          <Image
            source={require("../../assets/images/restaurantbanner.jpg")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <Spacing marginBottom={50} />
        <View style={styles.container}>
          <Text style={styles.bodyText}>Email</Text>
          <RoundedTextInput
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
          />
          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Restaurant Name</Text>
          <RoundedTextInput
            onChangeText={(username) => setUsername(username)}
            placeholder="Restaurant Name"
          />

           <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Address</Text>
          <RoundedTextInput
            onChangeText={(address) => setAddress(address)}
            placeholder="Address"
          />

          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Average Waiting Time (minutes)</Text>
          <RoundedTextInput
            onChangeText={(preparationTime) => setPreparationTime(preparationTime)}
            placeholder="Average Waiting Time (minutes)"
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              maxWidth: 350,
            }}
          >
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Contact Number</Text>
              <RoundedTextInput
                onChangeText={(contactNumber) => setContactNumber(contactNumber)}
                placeholder="Contact Number"

              />
            </View>
            <View style={{ marginLeft: 10 }} />
            <View style={{ flex: 1}}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Category</Text>
              <RoundedTextInput
                onChangeText={(category) =>
                  setCategory(category)
                }
                placeholder="Category"

              />
          {/*    <View style={styles.container}>
              <DropDownPicker
                items={[
                  { label: 'Western', value: 'Western',selected:true },
                  { label: 'Asian', value: 'Asian' },
                  { label: 'Japanese', value: 'Japanese' },
                  { label: 'Korean', value: 'Korean' },
                              ]}
                onChangeItem={(item) => setCategory(item.category)}
                defaultValue="Western"
                containerStyle={styles.containerStyles}
                style={styles.dropDownStyles}
                dropDownStyle={styles.dropDownStyles}
                itemStyle={styles.itemStyles}       
                setOpen={setOpen}
                setValue={setValue}      
            />
            </View>*/}
            </View> 
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              maxWidth: 350,
            }}
          >
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Password</Text>
              <RoundedTextInput
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={{ marginLeft: 10 }} />
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Confirmed Password</Text>
              <RoundedTextInput
                onChangeText={(confirmedPassword) =>
                  setConfirmedPassword(confirmedPassword)
                }
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
          </View>



          <Spacing marginTop={50} />
          <PrimaryButton onPress={SignUp} text="Sign Up" />
          <Spacing marginTop={10} />

          <Spacing marginTop={30} />
          <SecondaryButton
            onPress={SignUp}
            descriptiveText={"Have an account? "}
            functionalText={"Sign In!"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackground: {
    paddingTop: 20,
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: "#f7fcff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container: {
    flex: 2,
    width: "85%",
    maxWidth: 350,
    maxHeight: 670,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    alignSelf: "flex-end",
  },
  image: {
    width: "100%",
    height: 200,
    opacity: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bodyText: {
    width: "100%",
    maxWidth: 350,
    fontSize: 14,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 5,
    shadowColor: "#000000",
  },
  logo: {
    height: 150,
    width: "100%",
    borderRadius: 20,
  },
  margin: {
    marginVertical: 5,
  },
  containerStyles: {
    minHeight: 50,
    minWidth: 149,
    borderColor: '#6F8C95',
    borderRadius: 6,
  },
  dropDownStyles: {
    backgroundColor: '#fff',
  },
  itemStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container2: {
    marginHorizontal: 20,
    marginBottom: 22.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1000,
  },
});

export default RestaurantSignUp;
