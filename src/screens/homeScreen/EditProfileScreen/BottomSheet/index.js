import React from "react";
import {
  Text,
  View,
  Dimensions,
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
      image: null,
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
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    const { onPhotoUpdate } = this.props;
    onPhotoUpdate.bind(this, this.setState({ image: result.uri }));
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
        <TouchableOpacity onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="md-photos" size={23} />
            {<Text>{"   "}</Text>}
            <Text style={bottomSheetStyles.textOptions}>
              Choose From Gallery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
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
