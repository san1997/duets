import React from "react";
import { View, Button, Text } from "react-native";

export function DrawerContent(props) {
  return (
    <View style={{ marginTop: 50 }}>
      <Text>Here</Text>
      <Button
        title="Go somewhere"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate("FeedScreen2");
        }}
      />
    </View>
  );
}
