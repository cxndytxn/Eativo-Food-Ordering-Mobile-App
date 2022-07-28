import Toast from "react-native-toast-message";
import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Spacing from "../../components/views/Spacing";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firestore } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const StaffCard = ({ uid, image, username }) => {
  const DeleteDoc = async () => {
      console.log("delete")
    await deleteDoc(doc(firestore, "staffs", uid)).then(
      Toast.show({
        type: "success",
        text1: "You'd removed " + uid + " from Staffs List!",
      })
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginRight: 10 }}>
        <Text style={styles.username}>{username}</Text>
        <Spacing marginBottom={5} />
        <TouchableOpacity
          style={{
            backgroundColor: "#c90404",
            borderRadius: 100,
            width: 25,
            height: 25,
            shadowColor: "#000000",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={DeleteDoc}
        >
          <Ionicons name="remove-outline" color={"white"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default StaffCard;
