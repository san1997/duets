import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { PreviewScreenStyles } from "./style.js";

class PreviewScreen extends Component {

  renderHeading() {
    const images = this.props.route.params.images && this.props.route.params.images.length;
    return (
      <Text style={PreviewScreenStyles.heading}>
        { images ? 'Second Upload' : 'First Upload' }
      </Text>
    );
  }

  renderCheckButton() {
    return (
        <TouchableOpacity
          style={PreviewScreenStyles.actionItems}
          onPress={() => {
            this.props.route.params.addImageToDuet(this.props.route.params.data)
          }}>
          <AntDesign name="checkcircle" size={60} color="#84de02" />
        </TouchableOpacity>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={PreviewScreenStyles.refresh}
        onPress={() => {
          this.props.navigation.goBack()
        }}>
        <MaterialCommunityIcons name="backup-restore" size={60} color="#e4dfdf" />
      </TouchableOpacity>
    );
  }

  render(){
    const data = this.props.route.params.data
    console.log(data);
    const images = [{url: data.uri}];
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Image
          style={{flex: 1}}
          resizeMode='contain'
          source={{uri: data.uri}}
          backgroundColor= "#000"
        />
        {this.renderCheckButton()}
        {this.renderBackButton()}
        {this.renderHeading()}
      </View>
    );
  }
}

export default PreviewScreen;
