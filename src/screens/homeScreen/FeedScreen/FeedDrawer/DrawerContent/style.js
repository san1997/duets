import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../../../../../constConfig/colors";
import fonts from "../../../../../constConfig/fonts";

export const drawerContentStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  drawerContainer: {
    flex: 1,
  },

  profileContainer: {
    // justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  userNameStyle: {
    fontFamily: fonts.semibold_text,
    fontSize: 15,
    marginTop: 10,
  },
  editProfileLinkStyle: {
    color: colors.linkDarkColor,
    fontFamily: fonts.regular_text,
    marginTop: 5,
  },
  drawerSectionStyle: {
    marginTop: -10,
  },
  drawerTextStyle: {
    fontFamily: fonts.regular_text,
    fontSize: 15,
  },
  bottomDrawerSection: {
    marginBottom: 1,
    borderTopColor: colors.backgroundGrey,
    borderTopWidth: 1,
  },

  profilePhotoStyle: {},
});
