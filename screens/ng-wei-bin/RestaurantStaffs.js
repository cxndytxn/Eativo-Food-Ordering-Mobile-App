import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Style,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, firestore } from "../../firebase";
import Spacing from "../../components/views/Spacing";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import StaffCard from "../../components/cards/StaffCard";

const VerticalFlatListItemSeparator = () => {
  return <View style={{ marginBottom: 10 }} />;
};

const RestaurantStaffs = ({ navigation }) => {
  const [staffs, setStaffs] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (auth.currentUser != null) getStaff();
  }, [isFocused]);

  const getStaff = async () => {
    var staffsList = [];
    const q = await getDocs(
      query(
        collection(firestore, "staffs"),
        where("restaurantId", "==", auth.currentUser.uid)
      )
    );
    if (!q.empty) {
      q.forEach((snapshot) => {
        staffsList.push({
          ...snapshot.data(),
          key: snapshot.id,
        });
        setStaffs(staffsList);
      });
    } else {
      setStaffs([]);
    }
    // onSnapshot(q, (staffs) => {
    //   staffs.docChanges().forEach((change) => {
    //     staffsList.length = 0;
    //     //setStaffs([]);
    //     if (change.doc.exists()) {
    //       setStaffs([]);
    //       staffsList.push({
    //         ...change.doc.data(),
    //         key: change.doc.id,
    //       });
    //     }
    //     setStaffs(staffsList);
    //   })
    // staffs.forEach((staff) => {
    //   staffsList.push({
    //     ...staff.data(),
    //     key: staff.id,
    //   });
    //   setStaffs(staffsList);
    // });
    //});
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={staffs}
        renderItem={({ item, index }) => (
          <StaffCard
            uid={item.uid}
            image={item.imageUrl}
            username={item.username}
            key={index}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.verticalRestaurantCard}
        ItemSeparatorComponent={VerticalFlatListItemSeparator}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#FFC529",
          borderRadius: 100,
          width: 50,
          position: "absolute",

          bottom: 20,
          right: 20,
          height: 50,
          elevation: 4,
          zIndex: 10,
          shadowColor: "#000000",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() =>
          navigation.navigate("RestaurantNavigation", { screen: "Add Staffs" })
        }
      >
        <Ionicons name="add-outline" color={"black"} size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalRestaurantCard: {
    paddingBottom: 10,
  },
});

export default RestaurantStaffs;
