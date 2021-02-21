import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons, Entypo } from '@expo/vector-icons';

import PreviewScreen from "./PreviewScreen";
import DuetPreview from "./DuetPreview";
import { UploadScreenStyles } from "./style.js"

class UploadScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      hasPermission: null,
      hasGalleryPermission: null,
      type: Camera.Constants.Type.back,
      backgroundColor: '#fff',
      cameraOn: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const galleryStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL).status;
    this.setState({ hasPermission: status === 'granted', hasGalleryPermission: status === 'granted' });
  }

  componentDidUpdate(prevProps) {
    console.log('component did update',this.props.cameraOn);
    if (prevProps.cameraOn !== this.props.cameraOn) {
      this.setState({ cameraOn: this.props.cameraOn });
    }
  }

  renderFlash() {
    return (
      <TouchableOpacity
        style={UploadScreenStyles.flash}
        onPress={() => {
          console.log('flash clicked');
        }}>
        <Ionicons name="ios-flash-off" size={40} color="white" />
      </TouchableOpacity>
    );
  }

  renderCameraFlip() {
    return (
      <TouchableOpacity
        style={UploadScreenStyles.cameraFlip}
        onPress={() => {
          this.setState({ type:
            this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          });
        }}>
        <Ionicons name="camera-reverse-outline" size={50} color="white" />
      </TouchableOpacity>
    );
  }

  addImageToDuet = (image) => {
    let images = this.state.images;
    images.push(image);
    if (images.length > 2) {
      images = images.slice(2);
    }
    if (images.length === 2) {
      this.setState({images}, () => {
        this.props.navigation.goBack();
        this.props.navigation.navigate("DuetPreview", { images: images, uid: this.props.uid});
      });
    } else {
      this.setState({images}, () => {this.props.navigation.goBack();console.log('number of images in duet', images.length);});
    }
  }

  async snapPhoto() {
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, exif: true};
       await this.camera.takePictureAsync({skipProcessing: true}).then(photo => {
           this.props.navigation.navigate("PreviewScreen", {data: photo, addImageToDuet: this.addImageToDuet, images: this.state.images})
           });
     }
    }

  renderPhotoCapture() {
    return (
      <TouchableOpacity
        style={UploadScreenStyles.photoCaptureClick}
        onPress={() => this.snapPhoto()}>
        <Entypo name="circle" size={64} color="white" />
      </TouchableOpacity>
    );
  }

  async handleGalleryClick() {
    console.log('gallery clicked', this.state.hasGalleryPermission);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.props.navigation.navigate("PreviewScreen", {data: result, addImageToDuet: this.addImageToDuet, images: this.state.images})
      setImage(result.uri);
    }
  }

  renderGallery() {
    return (
      <TouchableOpacity
        style={UploadScreenStyles.gallery}
        onPress={() => {
          this.handleGalleryClick()
        }}>
        <Entypo name="images" size={45} color="white" />
      </TouchableOpacity>
    );
  }

  renderCameraFunctions() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        {false && this.renderFlash()}
        {this.renderCameraFlip()}
        {this.renderPhotoCapture()}
        {this.renderGallery()}
      </View>
    );
  }

renderCamera() {
    const { hasPermission } = this.state;
    if (hasPermission === null || !this.state.cameraOn) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }}
            type={this.state.type}
            ref={ (ref) => {this.camera = ref} }
            ratio={'16:9'}
          >
            {this.renderCameraFunctions()}
          </Camera>
        </View>
      );
    }
  }

  render() {
    console.log('current images are', this.state.images);
    return (
      this.renderCamera()
    );
  }
}

export default UploadScreen;
