import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { bottomSheetStyles } from "./style";
import * as ImagePicker from "expo-image-picker";

export class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={bottomSheetStyles.outSideView} />;
    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={bottomSheetStyles.touchableView}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  }

  openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.props.onProfilePicChange(result.uri);
    }
    this.close();
  };

  openLibraryPicker = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      this.props.onProfilePicChange(result.uri);
    }
    this.close();
  };

  removeProfilePhoto = () => {
    this.props.onProfilePicChange(
      "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg"
    );
    this.close();
  };

  renderTitle = () => {
    const { title } = this.props;
    return (
      <View style={bottomSheetStyles.titleContainer}>
        <Text style={bottomSheetStyles.title}>{title}</Text>
      </View>
    );
  };

  renderContent = () => {
    return (
      <View style={bottomSheetStyles.textOptionsContainer}>
        <TouchableOpacity onPress={this.openImagePicker}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ios-camera" size={25} />
            {<Text>{"   "}</Text>}
            <Text style={bottomSheetStyles.textOptions}>
              Click New Profile Picture
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.openLibraryPicker}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="md-photos" size={23} />
            {<Text>{"   "}</Text>}
            <Text style={bottomSheetStyles.textOptions}>
              Choose From Gallery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.removeProfilePhoto}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="md-trash" size={23} color="red" />
            {<Text>{"   "}</Text>}
            <Text style={{ ...bottomSheetStyles.textOptions, color: "red" }}>
              Remove Profile Picture
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let { show } = this.state;
    const { onTouchOutside } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View style={bottomSheetStyles.contianer}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View style={bottomSheetStyles.mainView}>
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}

export default BottomSheet;
