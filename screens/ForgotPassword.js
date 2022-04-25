import React from "react";
import { View, Text } from "react-native";

const ForgotPassword = () => {
  return (
    <View>
      <Text>This is Forgot Password screen.</Text>
      <RoundedTextInput placeholder="Enter your email" secureTextEntry={true} />
    </View>
  );
};

export default ForgotPassword;
