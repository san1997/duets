import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet } from "react-native";

import FeedScreenWrapper from "./NavigationWrappers/FeedScreenWrapper";
import UploadScreen from "./UploadScreen";
import ProfileScreenWrapper from "./NavigationWrappers/ProfileScreenWrapper";

class HomeScreen extends React.Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={1}>
        <UploadScreen />
        <FeedScreenWrapper uid={this.props.uid} />
        <ProfileScreenWrapper uid={this.props.uid} />
      </Swiper>
    );
  }
}

export default HomeScreen;
