import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { auth, firestore, storage } from "../../firebase";
import Spacing from "../../components/views/Spacing";
import RoundedTextInput from "../../components/textInputs/RoundedTextInput";
import {  doc, updateDoc, getDoc } from "firebase/firestore";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  getDownloadURL,
  ref as reference,
  uploadBytes,
} from "firebase/storage";

const EditMenuItem = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0.0);
  const [price, setPrice] = useState(0.0);
  const [uri, setUri] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const { mealId } = route.params;

  useEffect(() => {
    GetData(mealId);

    setRestaurantId();
    return () => setRestaurantId();
  }, []);

  const GetData = async () => {
    const docRef = doc(firestore, "meals", mealId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setDescription(docSnap.data()?.description);
      setQuantity(docSnap.data()?.quantity);
      setPrice(docSnap.data().price);
      console.log(docSnap.data().price);
      setUri(docSnap.data().imageUrl);
    } else {
      setName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setUri("");
    }
  };

  const EditMeal = async (name, description, quantity, price) => {
    await updateDoc(doc(firestore, "meals", mealId), {
      name: name,
      description: description,
      quantity: Number(parseFloat(quantity).toFixed(2)),
      imageUrl: "",
      price: Number(parseFloat(price).toFixed(2)),
      restaurantId: auth.currentUser.uid,
    }).then(() => {
      Toast.show({
        type: "success",
        text1: "You edited the meal!",
      });
      updateDoc(doc(firestore, "meals", mealId), {
        imageUrl: uri,
      });
      navigation.navigate("Menu");
    });
  };

  const Edit = () => {
    if (name.trim().length > 0) {
      EditMeal(name, description, quantity, price);
    } else {
      ShowToast();
    }
  };

  const ShowToast = () => {
    Toast.show({
      type: "error",
      text1: "Name shouldn't be empty!",
    });
  };

  const editItem = async (name, description, quantity, price) => {
    //Meal Object
    if (
      name.trim().length > 0 &&
      description.trim().length > 0 &&
      quantity.length > 0 &&
      price.length > 0
    ) {
      await updateDoc(doc(firestore, "meals", mealId), {
        name: name,
        description: description,
        quantity: quantity,
        imageUrl: "",
        price: price,
        restaurantId: auth.currentUser.uid,
      }).then(() => {
        Toast.show({
          type: "success",
          text1: "You edited the meal!",
        });
        updateDoc(doc(firestore, "meals", mealId), {
          imageUrl: uri,
        });
        navigation.navigate("Menu");
      });
    }
  };

  const UploadMealImage = async () => {
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

          var storagePath = "meals/" + auth.currentUser.uid;
          const ref = reference(storage, storagePath);

          await uploadBytes(ref, bytes).then(
            Toast.show({
              type: "success",
              text1: "You'd uploaded profile image!",
            })
          );

          getDownloadURL(ref).then((url) => {
            setUri(url);
            console.log(uri);
          });
        }
      }
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBackground}>
          <Spacing marginTop={20} />
          <TouchableOpacity onPress={UploadMealImage}>
            <Image
              source={
                uri === "" || uri == undefined
                  ? require("../../assets/images/imageupload.png")
                  : { uri: uri }
              }
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <Spacing marginTop={10} />
        </View>
        <View style={styles.container}>
          <Text style={styles.bodyText}>Name</Text>
          <RoundedTextInput
            onChangeText={(name) => setName(name)}
            placeholder="Name"
            value={name}
          />
          <Spacing marginTop={10} />
          <Text style={styles.bodyText}>Description</Text>
          <RoundedTextInput
            onChangeText={(description) => setDescription(description)}
            placeholder="Description"
            value={description}
          />
          <Spacing marginTop={10} />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              maxWidth: 350,
            }}
          >
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Price</Text>
              <RoundedTextInput
                onChangeText={(price) => setPrice(price)}
                placeholder="Price (RM)"
                value={price.toString()}
              />
            </View>
            <View style={{ marginLeft: 10 }} />
            <View style={{ flex: 1 }}>
              <Spacing marginTop={10} />
              <Text style={styles.bodyText}>Quantity</Text>
              <RoundedTextInput
                onChangeText={(quantity) => setQuantity(quantity)}
                placeholder="Quantity"
                value={quantity.toString()}
              />
            </View>
          </View>
          <Spacing marginBottom={20} />
          <PrimaryButton onPress={Edit} text="Edit Menu Item" />
        </View>
      </ScrollView>
    </View>
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
    height: 170,
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
    width: 150,
    height: 150,
    opacity: 50,
    borderRadius: 80,
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
    borderColor: "#6F8C95",
    borderRadius: 6,
  },
  dropDownStyles: {
    backgroundColor: "#fff",
  },
  itemStyles: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  container2: {
    marginHorizontal: 20,
    marginBottom: 22.5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1000,
  },
});

export default EditMenuItem;
