import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { editProfilePageStyles } from "./style";
import { CommonActions } from "@react-navigation/native";
import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import { showMessage } from "react-native-flash-message";

import { SERVER } from "../../../constConfig/config.js";
import queryString from "query-string";

class EditProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: this.props.route.params.userDetails,
      profile_uid: this.props.route.params.profile_uid,
      updated_firstName: this.props.route.params.userDetails.firstName
        ? this.props.route.params.userDetails.firstName
        : "",
      updated_lastName: this.props.route.params.userDetails.lastName
        ? this.props.route.params.userDetails.lastName
        : "",
      updated_userName: this.props.route.params.userDetails.userId
        ? this.props.route.params.userDetails.userId
        : "",
      updated_bio: this.props.route.params.userDetails.bio
        ? this.props.route.params.userDetails.bio
        : "",
    };
  }

  async handleSaveDetailsClick() {
    if (
      this.state.updated_bio !=
        (this.props.route.params.userDetails.bio
          ? this.props.route.params.userDetails.bio
          : "") ||
      this.state.updated_firstName !=
        (this.props.route.params.userDetails.firstName
          ? this.props.route.params.userDetails.firstName
          : "") ||
      this.state.updated_userName !=
        (this.props.route.params.userDetails.userId
          ? this.props.route.params.userDetails.userId
          : "") ||
      this.state.updated_lastName !=
        (this.props.route.params.userDetails.lastName
          ? this.props.route.params.userDetails.lastName
          : "")
    ) {
      var properUpdate = false;
      var trueString = "true";
      const queryObj = {
        userId: this.state.profile_uid,
        old_userName: this.props.route.params.userDetails.userId,
        updated_firstName: this.state.updated_firstName,
        updated_lastName: this.state.updated_lastName,
        updated_userName: this.state.updated_userName,
        updated_bio: this.state.updated_bio,
      };
      const url = `${SERVER}/editProfilePage?${queryString.stringify(
        queryObj
      )}`;
      await fetch(url)
        .then((response) => response.text())
        .then((res) => {
          properUpdate = res;
        })
        .catch((error) => console.error(error));

      if (!(trueString == properUpdate)) {
        console.log("user-id match from database");
        this.showAlertMessage(strings.selectedUserIdProfile);
        return;
      }

      this.props.route.params.updateUserDetails(
        this.state.profile_uid,
        this.props,
        CommonActions
      );
    } else {
      this.props.navigation.dispatch(CommonActions.goBack());
    }
  }

  showAlertMessage(message) {
    showMessage({
      message,
      type: "info",
      duration: 5000,
    });
  }

  render() {
    return (
      <SafeAreaView style={editProfilePageStyles.androidSafeArea}>
        <View style={editProfilePageStyles.editTextContainer}>
          <Text style={editProfilePageStyles.editTextStyle}>
            {strings.edit_profile}
          </Text>
        </View>
        <View style={editProfilePageStyles.editContainer}>
          <View style={editProfilePageStyles.editImageContainer}>
            <ImageBackground
              source={{
                uri: this.state.userDetails.profilePicture
                  ? this.state.userDetails.profilePicture
                  : "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg",
              }}
              style={{
                height: Dimensions.get("window").height / 6,
                width: Dimensions.get("window").height / 6,
              }}
              imageStyle={{
                borderRadius: Dimensions.get("window").height / 12,
              }}
            ></ImageBackground>
          </View>
        </View>
        <View style={editProfilePageStyles.editProfileTextContainer}>
          <View style={editProfilePageStyles.action}>
            <FontAwesome
              name="user-circle-o"
              size={20}
              color={colors.editProfileIconColor}
            />
            <TextInput
              placeholder="First Name"
              style={editProfilePageStyles.textInput}
              placeholderTextColor={colors.textLightColor}
              value={this.state.updated_firstName}
              onChangeText={(inputText) => {
                this.setState({
                  updated_firstName: inputText,
                });
              }}
            />
          </View>
          <View style={editProfilePageStyles.action}>
            <FontAwesome
              name="user-circle"
              size={20}
              color={colors.editProfileIconColor}
            />
            <TextInput
              placeholder="Last Name"
              style={editProfilePageStyles.textInput}
              placeholderTextColor={colors.textLightColor}
              value={this.state.updated_lastName}
              onChangeText={(inputText) => {
                this.setState({
                  updated_lastName: inputText,
                });
              }}
            />
          </View>
          <View style={editProfilePageStyles.action}>
            <FontAwesome
              name="at"
              size={20}
              color={colors.editProfileIconColor}
            />
            <TextInput
              placeholder="User Id"
              placeholderTextColor={colors.textLightColor}
              value={this.state.updated_userName}
              style={editProfilePageStyles.textInput}
              onChangeText={(inputText) => {
                this.setState({
                  updated_userName: inputText,
                });
              }}
            />
          </View>
          <View style={editProfilePageStyles.action}>
            <Feather
              name="info"
              size={20}
              color={colors.editProfileIconColor}
            />
            <TextInput
              placeholder="Bio"
              placeholderTextColor={colors.textLightColor}
              value={this.state.updated_bio}
              multiline={true}
              style={editProfilePageStyles.textInput}
              dense={true}
              onChangeText={(inputText) => {
                this.setState({
                  updated_bio: inputText,
                });
              }}
            />
          </View>
          <View style={editProfilePageStyles.buttonContainer}>
            <TouchableOpacity
              style={editProfilePageStyles.button}
              onPress={() => this.handleSaveDetailsClick()}
            >
              <Text style={editProfilePageStyles.panelButton}>
                {strings.saveDetails}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default EditProfileScreen;
