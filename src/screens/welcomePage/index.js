import React from "react";

import { WelcomePageStyles, Title, Logo, manifest } from "./style.js";
import logoImage from "../../assets/logo.png";
import { app } from "firebase";

class WelcomePage extends React.Component {
  render() {
    return (
      <WelcomePageStyles>
        <Logo source={logoImage}></Logo>
        <Title>Welcome to Duet</Title>
      </WelcomePageStyles>
    );
  }
}

export default WelcomePage;
