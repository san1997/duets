import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { editProfilePageStyles } from "./style";
import BottomSheet from "./BottomSheet/index";

const EditProfileScreen = (props) => {
  const [profilePic, setProfilePic] = useState(
    "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg"
  );

  let popupRef = React.createRef();
  const onShowBottomSheet = () => {
    popupRef.show();
  };

  const onCloseBottomSheet = () => {
    popupRef.close();
  };

  const onProfilePicChangeHandler = (newProfilePic) => {
    setProfilePic(newProfilePic);
  };

  return (
    <SafeAreaView style={editProfilePageStyles.androidSafeArea}>
      <View style={editProfilePageStyles.editContainer}>
        <TouchableNativeFeedback
          style={editProfilePageStyles.editImageContainer}
          onPress={onShowBottomSheet}
        >
          <ImageBackground
            source={{
              uri: profilePic,
            }}
            style={{
              height: Dimensions.get("window").height / 6,
              width: Dimensions.get("window").height / 6,
            }}
            imageStyle={{
              borderRadius: Dimensions.get("window").height / 12,
            }}
          ></ImageBackground>
        </TouchableNativeFeedback>
        <View style={editProfilePageStyles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Name"
            style={editProfilePageStyles.textInput}
          />
        </View>
        <View style={editProfilePageStyles.action}>
          <Feather name="mail" size={20} />
          <TextInput
            placeholder="Email Address"
            style={editProfilePageStyles.textInput}
            keyboardType="email-address"
          />
        </View>
        <View style={editProfilePageStyles.action}>
          <Feather name="phone" size={20} />
          <TextInput
            placeholder="Phone Number"
            style={editProfilePageStyles.textInput}
            keyboardType="number-pad"
          />
        </View>
        <View style={editProfilePageStyles.action}>
          <Feather name="info" size={20} />
          <TextInput
            placeholder="Bio"
            style={editProfilePageStyles.textInput}
          />
        </View>
        <View style={editProfilePageStyles.buttonContainer}>
          <TouchableOpacity
            style={editProfilePageStyles.button}
            onPress={() => {}}
          >
            <Text style={editProfilePageStyles.panelButton}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={editProfilePageStyles.button}
            onPress={() => {}}
          >
            <Text style={editProfilePageStyles.panelButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={(target) => (popupRef = target)}
        onTouchOutside={onCloseBottomSheet}
        title="Change Profile Picture"
        onProfilePicChange={onProfilePicChangeHandler}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
