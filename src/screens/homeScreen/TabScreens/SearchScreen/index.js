import React from "react";
import { Text, View, SafeAreaView, Image } from "react-native";

import { searchScreenStyles } from "./style.js";
import logoImage from "../../../../assets/logo.png";

class SearchScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={searchScreenStyles.androidSafeArea}>
        <View style={searchScreenStyles.searchPageContainer}>
          <View style={searchScreenStyles.logoContainer}>
            <Image
              style={{
                resizeMode: "contain",
                width: 45,
              }}
              source={logoImage}
            />
          </View>
          <View style={searchScreenStyles.searchBoxContainer}></View>
          <Text style={{ margin: 30 }}> Here in Search screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default SearchScreen;
