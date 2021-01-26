import React from "react";
import { SafeAreaView, View, Image, BackHandler, Alert } from "react-native";
import { FlatList, ScrollView} from "react-native-gesture-handler";
import { CommonActions } from '@react-navigation/native';

import { fullDuetScreenStyles } from "./style.js";

class FullDuetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.route.params.imgDetails };
  }

  renderDuet = ({ item }) => {
    return (
      <View>
        <Image
          source={{ uri: item }}
          style={fullDuetScreenStyles.duetFullImageStyle}
        />
      </View>
    );
  };

  backAction = () => {
    this.props.navigation.dispatch(CommonActions.goBack());
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  render() {
    return (
      <SafeAreaView style={fullDuetScreenStyles.androidSafeArea}>
        <View style={fullDuetScreenStyles.fullDuetScreenContainer}>
          <ScrollView>
            <FlatList
              inverted={this.props.route.params.startFromBack}
              style={fullDuetScreenStyles.fullDuetContainer}
              horizontal={true}
              data={this.state.data}
              renderItem={this.renderDuet}
              keyExtractor={(item, index) => index.toString()}
              pagingEnabled
              scrollEnabled
              // decelerationRate={"fast"}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default FullDuetScreen;
