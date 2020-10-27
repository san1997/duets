import React from "react";
import {Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import queryString from 'query-string';

import UploadScreen from "../../UploadScreen";
import PreviewScreen from "../../UploadScreen/PreviewScreen";
import DuetPreview from "../../UploadScreen/DuetPreview";

import { SERVER } from '../../../../constConfig/config';


const UploadStack = createStackNavigator();

class UploadScreenWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetails: null
    }
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    console.log('fetching user details', this.props);
    const queryObj = {
      userId: this.props.uid
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
    return (
      <NavigationContainer independent="true">
        <UploadStack.Navigator
          initialRouteName="UploadScreen"
          screenOptions={{ headerShown: false }}
        >
          <UploadStack.Screen name="UploadScreen" component={UploadScreen} initialParams={{...this.props}}/>
          <UploadStack.Screen
            name="PreviewScreen"
            component={PreviewScreen}
          />
          <UploadStack.Screen
            name="DuetPreview"
            component={DuetPreview}
            initialParams={{userDetails: this.state.userDetails}}
          />
        </UploadStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default UploadScreenWrapper;
