import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import Spacing from "../../components/views/Spacing";

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [username, setUsername] = useState("");

  const Edit = () => {
    if (
      email.trim().length > 0 &&
      username.trim().length > 0 &&
      address.trim().length > 0 &&
      contactNumber.trim().length > 0
    ) {
      navigation.navigate("Home", {
        email: email,
        password: password,
      });
    } else {
      ShowToast();
    }
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "Oops, email and password shouldn't be empty!",
    });
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBackground}>
          <Image
            source={require("../../assets/images/sign_in_banner.png")}
            resizeMode="cover"
            style={styles.image}
          />
          <Spacing marginTop={10} />
          <Text style={styles.text}>Erin</Text>
          <Spacing marginTop={10} />
          <Text style={styles.address}>
            186, Jalan Bukit Bintang, Bukit Bintang St
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.bodyText}>Email</Text>
          <RoundedTextInput
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
          />
          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Username</Text>
          <RoundedTextInput
            onChangeText={(username) => setUsername(username)}
            placeholder="Username"
          />
          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Default Address</Text>
          <RoundedTextInput
            onChangeText={(address) => setAddress(address)}
            placeholder="Default Address"
          />
          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Contact Number</Text>
          <RoundedTextInput
            onChangeText={(contactNumber) => setContactNumber(contactNumber)}
            placeholder="Contact Number"
          />
          <Spacing marginBottom={20} />
          <PrimaryButton onPress={Edit} text="Edit" />
          <Spacing marginBottom={20} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#FFAA3A",
    fontSize: 20,
  },
  address: {
    color: "#666666",
  },
  headerBackground: {
    alignItems: "center",
    width: "100%",
    height: 170,
  },
  container: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  textButton: {
    alignSelf: "flex-end",
  },
  image: {
    width: 80,
    height: 80,
    opacity: 50,
    borderRadius: 100,
  },
  bodyText: {
    width: "90%",
    maxWidth: 300,
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
});

export default Profile;
