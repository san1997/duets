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

import { RegistrationPageStyles, registrationPageStyles } from "./style.js";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";
import { SERVER } from "../../../constConfig/config";

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      id: "",
      password: "",
      signupDisable: true,
    };
  }

  handleTextChange(inputText, type) {
    this.setState({
      [type]: inputText,
    });
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.id &&
      this.state.password
    ) {
      this.setState({ signupDisable: false });
    }
  }

  handleSignup(route) {
    if (!this.verifyPassword()) {
      this.showAlertMessage(strings.unsecurePassword);
      return;
    }
    const data = {
      id: this.state.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userId: this.props.route.params.userId,
    };
    fetch(`${SERVER}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("response here", res);
        if (!res.error) {
          this.props.route.params.loginUser(res.uid);
          this.props.navigation.dispatch(CommonActions.goBack());
          this.props.navigation.goBack(null);
        } else {
        }
      })
      .catch((err) => {
        console.log("error here", err);
      });
  }

  verifyPassword() {
    const pass = this.state.password;
    if (pass.length >= 6 && pass.match(/[0-9]/)) {
      return true;
    }
    return false;
  }

  showAlertMessage(message) {
    showMessage({
      message,
      type: "info",
      duration: 3000,
    });
  }

  render(route) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <RegistrationPageStyles>
          <View style={registrationPageStyles.logoContainer}>
            <Image
              style={registrationPageStyles.loginLogo}
              source={images.logoImage}
            />
            <Text style={registrationPageStyles.loginText}>
              {" "}
              {strings.loginMessage}
            </Text>
          </View>

          <View style={registrationPageStyles.formContainer}>
            <TextInput
              placeholder={"First Name"}
              placeholderTextColor={colors.textLightColor}
              underlineColorAndroid="transparent"
              style={registrationPageStyles.loginForminput}
              onChangeText={(inputText) =>
                this.handleTextChange(inputText, "firstName")
              }
              textAlign="left"
            />
          </View>

          <View style={registrationPageStyles.formContainer}>
            <TextInput
              placeholder={"Last Name"}
              placeholderTextColor={colors.textLightColor}
              underlineColorAndroid="transparent"
              style={registrationPageStyles.loginForminput}
              onChangeText={(inputText) =>
                this.handleTextChange(inputText, "lastName")
              }
              textAlign="left"
            />
          </View>

          <View style={registrationPageStyles.formContainer}>
            <TextInput
              placeholder={"Email id/ Phone no."}
              placeholderTextColor={colors.textLightColor}
              underlineColorAndroid="transparent"
              style={registrationPageStyles.loginForminput}
              onChangeText={(inputText) =>
                this.handleTextChange(inputText, "id")
              }
              textAlign="left"
            />
          </View>

          <View style={registrationPageStyles.formContainer}>
            <TextInput
              placeholder={"Password"}
              placeholderTextColor={colors.textLightColor}
              underlineColorAndroid="transparent"
              style={registrationPageStyles.loginForminput}
              onChangeText={(inputText) =>
                this.handleTextChange(inputText, "password")
              }
              textAlign="left"
            />
          </View>

          <TouchableOpacity
            style={[
              registrationPageStyles.loginHeadingContainer,
              {
                backgroundColor: this.state.signupDisable
                  ? colors.white
                  : colors.backgroundGrey,
              },
            ]}
            onPress={() => this.handleSignup(route)}
            disabled={this.state.signupDisable}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  registrationPageStyles.loginHeading,
                  {
                    color: this.state.signupDisable
                      ? colors.textLightColor
                      : colors.black,
                  },
                ]}
              >
                {strings.signupButtonText}
              </Text>
              <View style={{ paddingTop: 3, paddingLeft: 3 }}>
                <Arrow_Icon
                  name="arrow-right"
                  color={
                    this.state.signupDisable
                      ? colors.textLightColor
                      : colors.black
                  }
                  size={22}
                />
              </View>
            </View>
          </TouchableOpacity>
        </RegistrationPageStyles>
      </SafeAreaView>
    );
  }
}

export default RegistrationPage;
