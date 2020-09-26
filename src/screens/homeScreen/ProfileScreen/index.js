import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Title, Caption } from "react-native-paper";

import { SERVER } from "../../../constConfig/config.js";
import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";

import { profilePageStyles } from "./style.js";
const ProfileScreen = (props) => {
  const switchToEditProfileScreenHandler = () => {
    props.navigation.navigate("EditProfileScreen");
  };

  return (
    <SafeAreaView style={profilePageStyles.androidSafeArea}>
      <View style={[profilePageStyles.headerContainer]}>
        <View style={profilePageStyles.flex_row}>
          <View style={profilePageStyles.logoContainer}>
            <Image
              style={profilePageStyles.loginLogo}
              source={images.logoImage}
            />
          </View>
          <TouchableOpacity
            style={[profilePageStyles.editProfileIconContainer]}
            onPress={switchToEditProfileScreenHandler}
          >
            <Icon name="account-edit" color={colors.black} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={profilePageStyles.userInfoSection}>
        <View style={profilePageStyles.userProfilePic}>
          <Avatar.Image
            source={{
              uri:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            }}
            size={Dimensions.get("window").height / 6}
          />
          <View style={profilePageStyles.userNameContainer}>
            <Title style={profilePageStyles.title}>Suyash Gupta</Title>
            <Caption style={profilePageStyles.caption}>@suyashrg</Caption>
          </View>
          <View style={profilePageStyles.userBio}>
            <Text>19 yr old Fashion Blogger</Text>
            <Text>Stream Young and Free ❤️</Text>
          </View>
        </View>
      </View>
      <View style={profilePageStyles.infoBoxWrapper}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <View style={profilePageStyles.infoBox}>
            <Title>101</Title>
            <Caption>Posts</Caption>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <View style={profilePageStyles.infoBox}>
            <Title>234</Title>
            <Caption>Followers</Caption>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <View style={profilePageStyles.infoBox}>
            <Title>193</Title>
            <Caption>Following</Caption>
          </View>
        </TouchableOpacity>
      </View>
      <View style={profilePageStyles.uploadContainer}>
        <Text style={profilePageStyles.uploadText}>Uploads</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
