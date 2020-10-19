import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


class PreviewScreen extends Component {

  render(){
    const data = this.props.route.params.data
    console.log(data);
    const images = [{url: data.uri}];
    return (
        <ImageViewer imageUrls={images}/>
    );
  }
}

export default PreviewScreen;
