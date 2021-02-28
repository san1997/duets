import React from "react";

import FirstPage from "../firstPage";

import { WelcomePageStyles, Title, Logo } from "./style.js";
import logoImage from "../../assets/logo.png";

class WelcomePage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.setState({ timeoutComplete: true });
    }, 3000);
  }
  constructor(props) {
    super(props);
    this.state = {
      timeoutComplete: false,
    };
  }
  renderWelcome() {
    return (
      <WelcomePageStyles>
        <Logo source={logoImage}></Logo>
        <Title>Welcome to Duets</Title>
      </WelcomePageStyles>
    );
  }
  render() {
    return this.state.timeoutComplete ? (
      <FirstPage navigation={this.props.navigation} />
    ) : (
      this.renderWelcome()
    );
  }
}

export default WelcomePage;
