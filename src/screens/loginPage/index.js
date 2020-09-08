import React, { useState } from "react";
import {
  Button,
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/EvilIcons";

import strings from "../../constConfig/strings";
import colors from "../../constConfig/colors";
import images from "../../constConfig/images";

import { LoginPageStyles, loginStyles } from "./style.js";

function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      continueBackColor: colors.white,
      continueTextColor: colors.textLightColor,
      continueDisable: true,
      textSize: 14,
      directionArrowSize: 20,
      directionArrowColor: colors.textLightColor,
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LoginPageStyles>
          <View style={loginStyles.logoContainer}>
            <Image style={loginStyles.loginLogo} source={images.logoImage} />
            <Text style={loginStyles.loginText}> {strings.loginMessage}</Text>
          </View>

          <View style={loginStyles.loginHeadingContainer}>
            <Text style={loginStyles.loginHeading}>{strings.loginHeading}</Text>
          </View>

          <View style={loginStyles.loginFormContainer}>
            <TextInput
              placeholder={"Enter Mobile/ Email Id"}
              placeholderTextColor={colors.textLightColor}
              keyboardType="email-address"
              onChangeText={(inputText) => {
                if (inputText != "") {
                  this.setState({
                    continueBackColor: colors.borderLightColor,
                    continueTextColor: colors.black,
                    continueDisable: false,
                    textSize: 16,
                    directionArrowSize: 25,
                    directionArrowColor: colors.black,
                  });
                } else {
                  this.setState({
                    continueBackColor: colors.white,
                    continueTextColor: colors.textLightColor,
                    continueDisable: true,
                    textSize: 14,
                    directionArrowSize: 20,
                    directionArrowColor: colors.textLightColor,
                  });
                }
              }}
              style={loginStyles.loginForminput}
            />
          </View>

          <TouchableOpacity
            disabled={this.state.continueDisable}
            style={[
              loginStyles.continueContainer,
              { backgroundColor: this.state.continueBackColor },
            ]}
          >
            <View style={loginStyles.flex_row}>
              <Text
                style={[
                  loginStyles.continueDiv,
                  {
                    color: this.state.continueTextColor,
                    fontSize: this.state.textSize,
                  },
                ]}
              >
                {strings.continue}
              </Text>
              <Icon
                name="arrow-right"
                size={this.state.directionArrowSize}
                color={this.state.directionArrowColor}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={loginStyles.forgotPassContainer}>
            <Text style={loginStyles.forgotPassHeading}>
              {strings.forgotPass}
            </Text>
          </TouchableOpacity>

          <View style={loginStyles.orDivContainer}>
            <Text style={loginStyles.orDivText}>{strings.orHeading}</Text>
          </View>

          <TouchableOpacity style={loginStyles.signupHeadingContainer}>
            <Text style={loginStyles.signupHeading}>
              {strings.signupHeading}
            </Text>
          </TouchableOpacity>

          <View style={loginStyles.goToHomeButton}>
            <GoToButton screenName="HomeScreen" />
          </View>
        </LoginPageStyles>
      </SafeAreaView>
    );
  }
}

export default LoginPage;
