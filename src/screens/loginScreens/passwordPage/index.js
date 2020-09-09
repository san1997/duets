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
import Icon from "react-native-vector-icons/Entypo";
import Arrow_Icon from "react-native-vector-icons/EvilIcons";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";

import { PasswordPageStyles, passwordPageStyles } from "./style.js";
import { color } from "react-native-reanimated";

/* Not removing it now..might be useful in future */
/*function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}*/

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginbuttonTextColor: colors.textLightColor,
      loginbuttonBackColor: colors.white,
      loginDisable: true,
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <PasswordPageStyles>
          <View style={passwordPageStyles.logoContainer}>
            <Image
              style={passwordPageStyles.loginLogo}
              source={images.logoImage}
            />
            <Text style={passwordPageStyles.loginText}>
              {" "}
              {strings.loginMessage}
            </Text>
          </View>

          <View style={passwordPageStyles.welcomeHeadingContainer}>
            <Text style={passwordPageStyles.welcomeHeading}>
              {strings.welcome}
            </Text>
          </View>

          <TouchableOpacity style={[passwordPageStyles.detailsContainer]}>
            <View style={passwordPageStyles.flex_row}>
              <Text style={[passwordPageStyles.detailsDiv]}>
                {this.props.route.params.userDetails}
              </Text>
              <Icon name="chevron-small-down" color={colors.black} size={23} />
            </View>
          </TouchableOpacity>

          <View style={passwordPageStyles.passwordFormContainer}>
            <TextInput
              placeholder={strings.enterPass}
              placeholderTextColor={colors.textLightColor}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              style={passwordPageStyles.loginForminput}
              onChangeText={(inputText) => {
                if (inputText != "") {
                  this.setState({
                    loginbuttonTextColor: colors.black,
                    loginbuttonBackColor: colors.backgroundGrey,
                    loginDisable: false,
                  });
                } else {
                  this.setState({
                    loginbuttonTextColor: colors.textLightColor,
                    loginbuttonBackColor: colors.white,
                    loginDisable: true,
                  });
                }
              }}
            />
          </View>

          <TouchableOpacity style={passwordPageStyles.forgotPassContainer}>
            <Text style={passwordPageStyles.forgotPassHeading}>
              {strings.forgotPass}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              passwordPageStyles.loginHeadingContainer,
              { backgroundColor: this.state.loginbuttonBackColor },
            ]}
            onPress={() => this.props.navigation.navigate("HomeScreen")}
            disabled={this.state.loginDisable}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  passwordPageStyles.loginHeading,
                  { color: this.state.loginbuttonTextColor },
                ]}
              >
                {strings.loginButtonText}
              </Text>
              <View style={{ paddingTop: 3, paddingLeft: 3 }}>
                <Arrow_Icon
                  name="arrow-right"
                  color={this.state.loginbuttonTextColor}
                  size={22}
                />
              </View>
            </View>
          </TouchableOpacity>
        </PasswordPageStyles>
      </SafeAreaView>
    );
  }
}

export default LoginPage;
