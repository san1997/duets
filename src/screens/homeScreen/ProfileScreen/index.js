import React from 'react';
import { Text, Image, View } from 'react-native';
import queryString from 'query-string';

import { SERVER } from '../../../constConfig/config.js';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    const queryObj = {
      userId: this.props.userId
    }
    const url = `${SERVER}/user-details?${queryString.stringify(queryObj)}` ;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userDetails: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.userDetails) {
      return (
        <View style={{alignItems: 'center'}}>
          <Image source={{ uri: this.state.userDetails.profilePicture }} style={{ top: 50, right: 30, width: 305, height: 409}} />
          <Text style={{top: 150}}>{this.state.userDetails.firstName}</Text>
        </View>
      );
    }
    return null;
  }
}

export default ProfileScreen;
