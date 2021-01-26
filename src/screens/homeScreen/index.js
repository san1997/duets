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
      cameraOn: false,
      swiper: true,
      currentIndex: 1,
    };
    this.swiperStateChange = this.swiperStateChange.bind(this);
  }

  handleIndex(ind) {
    if (ind === 0) {
      this.setState({ cameraOn: true });
    } else {
      this.setState({ cameraOn: false });
    }
  }

  swiperStateChange = (val) => {
    this.setState({ swiper: val });
  };

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        scrollEnabled={this.state.swiper}
        index={this.state.currentIndex}
        onIndexChanged={(ind) => this.handleIndex(ind)}
      >
        <UploadScreenWrapper
          uid={this.props.uid}
          cameraOn={this.state.cameraOn}
        />
        <FeedScreenWrapper
          uid={this.props.uid}
          swiperStateChange={this.swiperStateChange}
          logoutUser={this.props.logoutUser}
        />
        <ProfileScreenWrapper
          users_uid={this.props.uid}
          profile_uid={this.props.uid}
        />
      </Swiper>
    );
  }
}

export default HomeScreen;
