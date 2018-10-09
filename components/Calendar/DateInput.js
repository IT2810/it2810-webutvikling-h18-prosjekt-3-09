import React from "react";
import moment from "moment";

import { View } from "react-native";
import { FormLabel, Text } from "react-native-elements";

export default ({ label, onPress, value }) => (
  <View
    style={{
      marginVertical: 8,
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between"
    }}
  >
    <FormLabel>{label}</FormLabel>
    <Text
      onPress={onPress}
      style={{
        color: "grey",
        fontSize: 14,
        padding: 8,
        borderWidth: 1,
        borderColor: "black"
      }}
    >
      {value ? moment(value).format("YYYY. MMMM DD") : "not set"}
    </Text>
  </View>
);
