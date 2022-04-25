import React from "react";
import { View } from "react-native";

const Spacing = ({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
}) => {
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
      }}
    ></View>
  );
};

export default Spacing;
