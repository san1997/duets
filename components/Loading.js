import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{'Loading.....'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: "50%"
  },
});

export default Loading;
