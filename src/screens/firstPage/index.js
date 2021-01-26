import React from "react";
import { Text } from "react-native";

import LoginPage from "../loginScreens/loginPage";
import HomeScreen from "../homeScreen";

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: null,
    };
    this.loginUser = this.loginUser.bind(this);
  }
  loginUser = (userId) => {
    this.setState({
      loggedIn: true,
      userId,
    });
  };
  logoutUser = () => {
    console.log('user is logged out');
    this.setState({
      loggedIn: false,
      userId: null
    })
  };
  render() {
    return this.state.loggedIn ? (
      <HomeScreen
        uid={this.state.userId}
        logoutUser={this.logoutUser}
      />
    ) : (
      <LoginPage
        navigation={this.props.navigation}
        loginUser={this.loginUser}
      />
    );
  }
}

export default FirstPage;
