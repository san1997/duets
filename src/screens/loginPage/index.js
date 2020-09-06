import React from "react";
import { Button, Image, Text, View, TextInput, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  render() {
    return (
      <LoginPageStyles>
        <View style={loginStyles.logoContainer}>
          <Image style={loginStyles.loginLogo} source={images.logoImage} />
          <Text style={loginStyles.loginText}> {strings.loginMessage}</Text>
        </View>
        <View style={loginStyles.loginHeadingContainer}>
          <Text style={loginStyles.loginHeading}> {strings.loginHeading}</Text>
        </View>
        <View style={loginStyles.loginFormContainer}>
          <TextInput
            placeholder={"Enter Mobile/ Email Id"}
            placeholderTextColor={colors.textLightColor}
            style={loginStyles.loginForminput}
          />
          <TextInput
            placeholder={"Continue"}
            placeholderTextColor={colors.textLightColor}
            style={loginStyles.loginForminput}
          />
        </View>
        <View style={loginStyles.forgotPassContainer}>
          <Text
            style={loginStyles.forgotPassHeading}
            onPress={() => Linking.openURL("https://google.com")}
          >
            {strings.forgotPass}
          </Text>
        </View>
        <View style={loginStyles.orDivContainer}>
          <Text style={loginStyles.orDivText}>{strings.orHeading}</Text>
        </View>
        <View style={loginStyles.signupHeadingContainer}>
          <Text style={loginStyles.signupHeading}>{strings.signupHeading}</Text>
        </View>
        <View style={loginStyles.goToHomeButton}>
          <GoToButton screenName="HomeScreen" />
        </View>
      </LoginPageStyles>
    );
  }
}

export default LoginPage;
