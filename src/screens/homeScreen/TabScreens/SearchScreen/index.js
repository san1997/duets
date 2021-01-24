import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SearchBar } from "react-native-elements";

import { SERVER } from "../../../../constConfig/config";
import queryString from "query-string";

import { searchScreenStyles } from "./style.js";
import logoImage from "../../../../assets/logo.png";
import colors from "../../../../constConfig/colors";
import fonts from "../../../../constConfig/fonts.js";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      uid: this.props.route.params.uid,
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: colors.backgroundLight,
          alignSelf: "center",
          justifyContent: "center",
        }}
      />
    );
  };

  switchToProfileFeedStacks(user_uid, profile_uid) {
    this.props.navigation.navigate("ProfileScreen", {
      navigationFromFeed: true,
      profile_uid: profile_uid ? profile_uid: user_uid, // change it to only profile_uid after once each duet has user_id
      users_uid: user_uid,
      isUsersProfile: (profile_uid == user_uid)
    });
  }

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    if (text == "") {
      this.setState({
        data: [],
      });
      return;
    }

    const queryObj = {
      value: text,
    };
    const url = `${SERVER}/getSearchResults?${queryString.stringify(queryObj)}`;
    this.setState({ loading: true });
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          loading: false,
        });
      });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Dueters..."
        placeholderTextColor={colors.textLightColor}
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        rightIconContainerStyle={{}}
        leftIconContainerStyle={{ marginLeft: 15 }}
        showLoading={this.state.loading}
        value={this.state.value}
        containerStyle={{
          backgroundColor: "white",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: "white",
          borderWidth: 1,
          borderBottomWidth: 1,
          borderRadius: 25,
          borderColor: colors.borderLightColor,
        }}
        inputStyle={{
          color: colors.black,
          fontFamily: fonts.regular_text,
          fontSize: 15,
        }}
      />
    );
  };

  renderSearchResult = ({ item, index }) => {
    /* in future if loding needs to be shown */
    // if (this.state.loading) {
    //   return (
    //     <View
    //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //     >
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <TouchableOpacity style={{ flex: 1 }}
        onPress={() => this.switchToProfileFeedStacks(this.state.uid, item.uid)}
      >
        <View style={searchScreenStyles.flex_row}>
          <View style={searchScreenStyles.userThumbnailContainer}>
            <Image
              source={{
                uri: item.profilePicture
                  ? item.profilePicture
                  : "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg",
              }}
              style={searchScreenStyles.userThumbnail}
            />
          </View>
          <View style={searchScreenStyles.userNameContainer}>
            <Text style={searchScreenStyles.userNameStyle}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={searchScreenStyles.userIdStyle}>
              {"@"}
              {item.userId}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={searchScreenStyles.androidSafeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
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
            <View style={searchScreenStyles.searchBoxContainer}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderSearchResult}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
export default SearchScreen;
