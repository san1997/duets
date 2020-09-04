import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, StyleSheet } from 'react-native';

import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import UploadScreen from './UploadScreen';

class HomeScreen extends React.Component {

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}>
        <UploadScreen/>
        <FeedScreen/>
        <ProfileScreen/>
      </Swiper>
    )
  }
}

export default HomeScreen;
