import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";

const HeaderLeftButton = () => {
  //const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();

  return (
    <TouchableOpacity
      onPress={() => {
        drawerStatus === "open"
          ? navigation.closeDrawer()
          : navigation.openDrawer();
      }}
      style={{ paddingRight: 20 }}
    >
      <Ionicons name="menu-outline" size={30} />
    </TouchableOpacity>
  );
};

{
  /* <Menu
  visible={visible}
  onDismiss={() => setVisible(false)}
  anchor={
    <TouchableOpacity
      onPress={() => setVisible(true)}
      style={{ paddingRight: 20 }}
    >
      <Ionicons name="menu-outline" size={30} />
    </TouchableOpacity>
  }
>
  <Menu.Item
    onPress={() => {
      navigation.navigate("Sign In");
      setVisible(false);
    }}
    title="Sign In"
    icon="login"
  />
  <Menu.Item
    onPress={() => {
      navigation.navigate("Sign Up");
      setVisible(false);
    }}
    title="Sign Up"
    icon="account-plus"
  />
  <Menu.Item
    onPress={() => {
      navigation.navigate("Sign Out");
      setVisible(false);
    }}
    title="Sign Out"
    icon="logout"
  />
</Menu>; */
}

export default HeaderLeftButton;
