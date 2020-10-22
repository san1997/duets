import React from "react";
import {Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UploadScreen from "../../UploadScreen";
import PreviewScreen from "../../UploadScreen/PreviewScreen";
import DuetPreview from "../../UploadScreen/DuetPreview";


const UploadStack = createStackNavigator();

class UploadScreenWrapper extends React.Component {
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
          />
        </UploadStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default UploadScreenWrapper;
