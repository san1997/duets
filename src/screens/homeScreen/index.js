import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet } from "react-native";

import FeedScreenWrapper from "./NavigationWrappers/FeedScreenWrapper";
import UploadScreenWrapper from "./NavigationWrappers/UploadScreenWrapper";
import ProfileScreenWrapper from "./NavigationWrappers/ProfileScreenWrapper";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraOn: false
    }
  }

  handleIndex(ind) {
      if (ind === 0) {
        this.setState({cameraOn: true})
      } else {
        this.setState({cameraOn: false})
      }
  }
  render() {
    return (
      <Swiper loop={false}
        showsPagination={false}
        index={1}
        onIndexChanged={(ind) => this.handleIndex(ind)}
      >
        <UploadScreenWrapper uid={this.props.uid} cameraOn={this.state.cameraOn}/>
        <FeedScreenWrapper uid={this.props.uid}/>
        <ProfileScreenWrapper uid={this.props.uid}/>
      </Swiper>
    );
  }
}

export default HomeScreen;
