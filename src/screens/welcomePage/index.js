import React from "react";

import { WelcomePageStyles, Title, Logo } from "./style.js";
import logoImage from "../../assets/logo.png";
import { app } from "firebase";

class WelcomePage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("LoginPage");
    }, 3000);
  }
  render() {
    return (
      // <HomeScreen />
      <WelcomePageStyles>
        <Logo source={logoImage}></Logo>
        <Title>Welcome to Duet</Title>
      </WelcomePageStyles>
    );
  }
}

export default WelcomePage;
