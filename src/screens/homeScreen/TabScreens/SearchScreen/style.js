import styled from "styled-components/native";
import { StyleSheet, StatusBar } from "react-native";

import colors from "../../../../constConfig/colors";
import fonts from "../../../../constConfig/fonts";

export const searchScreenStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchPageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    top: "5%",
    flex: 0.25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBoxContainer: {
    flex: 0.7,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  searchForminput: {
    width: "80%",
    // height: "10%",
    padding: 6,
    borderWidth: 1,
    borderColor: colors.borderLightColor,
    borderRadius: 30,
    textAlign: "justify",

    fontFamily: fonts.regular_text,
    fontSize: 14,
  },
  flex_row: {
    flexDirection: "row",
    flex: 1,
  },
  userThumbnailContainer: {
    flex: 0.2,
    margin: 10,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  userThumbnail: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  userNameContainer: {},
  userNameStyle: {
    fontFamily: fonts.regular_text,
    color: colors.black,
    fontSize: 15,
    marginLeft: 5,
    marginTop: 10,
  },
  userIdStyle: {
    fontFamily: fonts.regular_text,
    color: colors.userIdColor,
    fontSize: 14,
    marginLeft: 5,
  },
});
