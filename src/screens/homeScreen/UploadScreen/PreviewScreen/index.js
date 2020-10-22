import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons } from '@expo/vector-icons';

import { PreviewScreenStyles } from "./style.js";

class PreviewScreen extends Component {

  renderActionItems() {
    return (
      <TouchableOpacity
        style={PreviewScreenStyles.actionItems}
        onPress={() => {
          this.props.route.params.addImageToDuet(this.props.route.params.data)
        }}>
        <Ionicons name="ios-checkmark-circle-outline" size={80} color="green" />
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
        <ImageViewer imageUrls={images}>
        </ImageViewer>
        {this.renderActionItems()}
      </View>
    );
  }
}

export default PreviewScreen;
