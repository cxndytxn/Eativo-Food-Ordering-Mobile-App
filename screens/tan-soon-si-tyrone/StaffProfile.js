import Toast from "react-native-toast-message";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import Spacing from "../../components/views/Spacing";
import { firestore, auth, storage } from "../../firebase";
import NotSignedIn from "../tan-xin-li/empty-states/NotSignedIn";
import {
  getDownloadURL,
  ref as reference,
  uploadBytes,
} from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const StaffProfile = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [uri, setUri] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (auth.currentUser != null) {
      setIsSignedIn(true);
      GetData(auth.currentUser);
    } else {
      setIsSignedIn(false);
    }
  }, [isFocused]);

  const GetData = async (currentUser) => {
    const docRef = doc(firestore, "staffs", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUsername(docSnap.data().username);
      setUri(docSnap.data()?.imageUrl);
      setEmail(docSnap.data().email);
      setIsSignedIn(true);
    } else {
      setUsername("");
      setUri("");
      setEmail("");
      setIsSignedIn(false);
    }
  };

  const Edit = () => {
    if (username.trim().length > 0) {
      EditProfile(username);
    } else {
      ShowToast();
    }
  };

  const EditProfile = async (username) => {
    await updateDoc(doc(firestore, "staffs", auth.currentUser.uid), {
      username: username,
    });
    Toast.show({
      type: "success",
      text1: "You'd edited user profile!",
    });
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "Oops, username shouldn't be empty!",
    });
  };

  const UploadProfileImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission must be granted to upload profile image!",
        });
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          allowsMultipleSelection: false,
        });

        if (!result.cancelled) {
          const img = await fetch(result.uri);
          const bytes = await img.blob();

          var storagePath = "staffs/" + auth.currentUser.uid;
          const ref = reference(storage, storagePath);

          await uploadBytes(ref, bytes).then(
            Toast.show({
              type: "success",
              text1: "You'd uploaded profile image!",
            })
          );

          getDownloadURL(ref).then((url) => {
            setUri(url);
            updateDoc(doc(firestore, "staffs", auth.currentUser.uid), {
              imageUrl: url,
            });
          });
        }
      }
    }
  };

  return (
    <View>
      {isSignedIn ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerBackground}>
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
            <Spacing marginTop={10} />
            <Text style={styles.text}>{username}</Text>
            <Spacing marginTop={10} />
          </View>
          <View style={styles.container}>
            <Text style={styles.bodyText}>Email</Text>
            <RoundedTextInput
              onChangeText={(email) => setEmail(email)}
              placeholder="Email"
              value={email}
              editable={false}
            />
            <Spacing marginTop={10} />
            <Text style={styles.bodyText}>Username</Text>
            <RoundedTextInput
              onChangeText={(username) => setUsername(username)}
              placeholder="Username"
              value={username}
            />
            <Spacing marginBottom={20} />
            <PrimaryButton onPress={Edit} text="Edit" />
            <Spacing marginBottom={20} />
          </View>
        </ScrollView>
      ) : (
        <NotSignedIn />
      )}
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
    color: "#FFC529",
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
    width: "85%",
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

export default StaffProfile;