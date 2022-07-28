import Toast from "react-native-toast-message";
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import Spacing from "../../components/views/Spacing";
import { auth, firestore } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import TextButton from "../../components/buttons/TextButton";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddStaffs = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [oriUser, setOriUser] = useState("");
  const [uri, setUri] = useState("");
  const [uid, setUid] = useState("");

//   const UploadProfileImage = async () => {
//     if (Platform.OS !== "web") {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== "granted") {
//         Toast.show({
//           type: "error",
//           text1: "Permission must be granted to upload profile image!",
//         });
//       } else {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.All,
//           allowsEditing: true,
//           allowsMultipleSelection: false,
//         });

//         if (!result.cancelled) {
//           const img = await fetch(result.uri);
//           const bytes = await img.blob();

//           var storagePath = "staffs/" + ;
//           const ref = reference(storage, storagePath);

//           await uploadBytes(ref, bytes).then(
//             Toast.show({
//               type: "success",
//               text1: "You'd uploaded profile image!",
//             })
//           );

//           getDownloadURL(ref).then((url) => {
//             setUri(url);
//             updateDoc(doc(firestore, "staffs", ), {
//               imageUrl: url,
//             });
//           });
//         }
//       }
//     }
//   };

  const CreateStaffDocument = async (email, username, uid, originalUser) => {
    await setDoc(doc(firestore, "staffs", uid), {
      uid: uid,
      username: username,
      email: email,
      type: "staff",
      restaurantId: originalUser?.uid,
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mpma-ttn.appspot.com/o/users%2Fdefault-user.jpg?alt=media&token=a8a025af-c96c-4afa-b209-ad2645678c7e",
    }).then(() => {
        auth.updateCurrentUser(originalUser)
        console.log(auth.currentUser?.uid + "second try")
    })
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "Oops, input fields should not be left empty!",
    });
  };

  const PlusStaff = () => {
      let originalUser = auth.currentUser
    if (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      username.trim().length > 0
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((staffCredentials) => {
            
          setUid(staffCredentials.user?.uid);
          CreateStaffDocument(email, username, staffCredentials.user.uid, originalUser).then(() => {
              auth.updateCurrentUser(originalUser)
              console.log(auth.currentUser?.uid + "TROLOLOLOLOL")
          })

          Toast.show({
            type: "success",
            text1: "Signed up successfully!",
          });
          navigation.navigate("RestaurantNavigation", {
            screen: "RestaurantTab",
          });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: error.message,
          });
        });
    } else {
      ShowToast();
    }
  };

  const AddStaffs = () => {
    navigation.navigate("Add Staffs");
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <View style={styles.headerBackground}>
          <TouchableOpacity onPress={UploadProfileImage}>
            <Image
              source={
                uri === "" || uri == undefined
                  ? require("../../assets/images/default-user.jpg")
                  : { uri: uri }
              }
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
        </View> */}
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
            {/* <View style={{ marginLeft: 10 }} />
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Role</Text>
              <RoundedTextInput
                onChangeText={(role) => setRole(role)}
                placeholder="Role"
                secureTextEntry={true}
              />
            </View> */}
          </View>
          <Spacing marginTop={50} />
          <PrimaryButton onPress={PlusStaff} text="Add Staff" />
          <Spacing marginTop={10} />
          <TextButton
            onPress={() =>
              navigation.navigate("RestaurantNavigation", {
                screen: "RestaurantTab",
              })
            }
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
    alignItems: "center",
    width: "100%",
    height: 120,
  },
  text: {
    fontWeight: "bold",
    color: "#FFC529",
    fontSize: 20,
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
    width: 80,
    height: 80,
    opacity: 50,
    borderRadius: 100,
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
});
export default AddStaffs;