import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { editProfilePageStyles } from "./style";

const EditProfileScreen = () => {
  return (
    <SafeAreaView style={editProfilePageStyles.androidSafeArea}>
      <View style={editProfilePageStyles.editContainer}>
        <View style={editProfilePageStyles.editImageContainer}>
          <ImageBackground
            source={{
              uri:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            }}
            style={{
              height: Dimensions.get("window").height / 6,
              width: Dimensions.get("window").height / 6,
            }}
            imageStyle={{
              borderRadius: Dimensions.get("window").height / 12,
            }}
          ></ImageBackground>
        </View>
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
    </SafeAreaView>
  );
};

export default EditProfileScreen;
