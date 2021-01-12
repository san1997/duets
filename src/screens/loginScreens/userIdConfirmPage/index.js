import React from "react";
import {
  Text,
  Image,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Arrow_Icon from "react-native-vector-icons/EvilIcons";
import { showMessage, hideMessage } from "react-native-flash-message";
import { CommonActions } from "@react-navigation/native";

import {
  userIdConfirmationPageStyles,
  UserIdConfirmationPageStyles,
} from "./style.js";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";
import { SERVER } from "../../../constConfig/config";
import queryString from "query-string";

class UserIdConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      signupDisable: true,
      notation: "",
    };
  }

  handleTextChange(inputText) {
    if (inputText != "") {
      this.setState({ signupDisable: false, notation: "@" });
    } else {
      this.setState({ signupDisable: true, notation: "" });
    }
    this.setState({
      userId: inputText,
    });
  }

  async handleSignup() {
    var newUser = false;
    var trueString = "true";
    const queryObj = {
      userId: this.state.userId,
    };
    const url = `${SERVER}/userIdConfirm?${queryString.stringify(queryObj)}`;
    await fetch(url)
      .then((response) => response.text())
      .then((res) => {
        newUser = res;
      })
      .catch((error) => console.error(error));

    if (!(trueString == newUser)) {
      console.log("old enter");
      this.showAlertMessage(strings.selectedUserId);
      return;
    }

    this.props.navigation.navigate("RegistrationPage", {
      userId: this.state.userId,
      loginUser: this.props.route.params.loginUser,
    });
  }

  showAlertMessage(message) {
    showMessage({
      message,
      type: "info",
      duration: 3000,
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <UserIdConfirmationPageStyles>
          <View style={userIdConfirmationPageStyles.logoContainer}>
            <Image
              style={userIdConfirmationPageStyles.loginLogo}
              source={images.logoImage}
            />
            <Text style={userIdConfirmationPageStyles.loginText}>
              {" "}
              {strings.loginMessage}
            </Text>
          </View>

          <View style={userIdConfirmationPageStyles.formContainer}>
            <TextInput
              placeholder={"Enter User Id"}
              placeholderTextColor={colors.textLightColor}
              underlineColorAndroid="transparent"
              style={userIdConfirmationPageStyles.loginForminput}
              onChangeText={(inputText) =>
                this.handleTextChange(inputText, "userId")
              }
              textAlign="center"
            />
          </View>

          <TouchableOpacity
            disabled={this.state.signupDisable}
            style={[
              userIdConfirmationPageStyles.loginHeadingContainer,
              {
                backgroundColor: this.state.signupDisable
                  ? colors.white
                  : colors.backgroundGrey,
              },
            ]}
            onPress={() => this.handleSignup()}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  userIdConfirmationPageStyles.loginHeading,
                  {
                    color: this.state.signupDisable
                      ? colors.textLightColor
                      : colors.black,
                  },
                ]}
              >
                {strings.goString} {this.state.notation}
                {this.state.userId}
              </Text>
              <View style={{ paddingTop: 3, paddingLeft: 3 }}>
                <Arrow_Icon
                  name="arrow-right"
                  color={
                    this.state.signupDisable
                      ? colors.textLightColor
                      : colors.black
                  }
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </UserIdConfirmationPageStyles>
      </SafeAreaView>
    );
  }
}

export default UserIdConfirmation;
