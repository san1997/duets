import React from "react";
import { SafeAreaView, View, Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

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
