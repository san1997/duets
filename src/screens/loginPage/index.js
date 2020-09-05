import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LoginPageStyles, Title, Logo } from "./style.js";
import logoImage from "../../assets/logo.png";

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
        <Logo source={logoImage}></Logo>
        <Title>Login Page</Title>
        <GoToButton screenName="HomeScreen" />
      </LoginPageStyles>
    );
  }
}

export default LoginPage;
