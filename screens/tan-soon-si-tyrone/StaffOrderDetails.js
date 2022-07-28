import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import {
  query,
  collection,
  doc,
  documentId,
  getDoc,
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import OrderMealCard from "../../components/cards/OrderMealCard";
import Spacing from "../../components/views/Spacing";
import { firestore } from "../../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const StaffOrderDetails = ({ navigation, route }) => {
  const { orderId } = route?.params;
  const isFocused = useIsFocused();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [ids, setIds] = useState([]);
  const [carts, setCarts] = useState([]);

  const data = ["In Kitchen", "Cooked", "Picked Up"];

  const renderItem = useCallback(
    (item) => (
      <TouchableOpacity
        key={item}
        style={styles.itemContainer}
        onPress={() => UpdateStatus(item)}
      >
        <Ionicons
          name={
            item == "In Kitchen"
              ? "stopwatch-outline"
              : item == "Cooked"
              ? "checkmark-circle-outline"
              : "basket-outline"
          }
          size={28}
        />
        <Spacing marginLeft={5} />
        <Text style={{ fontSize: 16 }}>{item}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const UpdateStatus = async (item) => {
    await updateDoc(doc(firestore, "orders", orderId), {
      status: item,
    }).then(() => {
      setStatus(item);
      Toast.show({
        type: "success",
        text1: "Order status updated successfully!",
      });
    });
  };

  useEffect(() => {
    FetchOrder();
  }, [isFocused]);

  useEffect(() => {
    GetCart();
  }, [ids]);

  const GetCart = async () => {
    const cart = [];
    ids.map(async (id) => {
      const q = query(
        collection(firestore, "carts"),
        where(documentId(), "==", id)
      );
      onSnapshot(q, (querySnapshots) => {
        if (!querySnapshots.empty) {
          querySnapshots.docs.map((doc) => {
            cart.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          setCarts(cart);
        }
      });
    });
  };

  const FetchOrder = async () => {
    const query = await getDoc(doc(firestore, "orders", orderId));
    if (query.exists()) {
      setDate(query.data().date);
      setTime(query.data().time);
      setStatus(query.data().status);
      setIds(query.data().ids);
    }
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
        }}
      />
    );
  };

  const snapPoints = useMemo(() => ["10%", "15%", "30%"], []);
  const sheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={{ fontWeight: "bold", color: "#F95F62", fontSize: 18 }}>
          {date} {time}
        </Text>
        <View style={styles.ratings}>
          <Text style={styles.ratingsText}>{status}</Text>
        </View>
      </View>
      <Spacing marginTop={10} />
      <Text style={{ fontWeight: "bold" }}>ID: {orderId}</Text>
      <Spacing marginBottom={30} />
      <FlatList
        data={carts}
        renderItem={({ item, index }) => (
          <OrderMealCard
            mealName={item.mealName}
            quantity={item.quantity}
            remarks={item.remarks}
            key={index}
          />
        )}
        keyExtractor={(item) => item.index}
        ItemSeparatorComponent={FlatListItemSeparator}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingTop: 30,
        }}
      />
      <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetScrollView>{data.map(renderItem)}</BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratings: {
    borderRadius: 50,
    backgroundColor: "#FFC529",
    width: "30%",
    maxWidth: 110,
    paddingVertical: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingsText: {
    color: "white",
    fontSize: 12,
    padding: 2,
    fontWeight: "bold",
  },
  itemContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default StaffOrderDetails;
