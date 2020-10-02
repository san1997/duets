import styled from "styled-components/native";
import { StyleSheet, StatusBar, Platform } from "react-native";

import colors from "../../../constConfig/colors";
import fonts from "../../../constConfig/fonts";

export const FeedPageStyles = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const feedPageStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
  },
  feedPageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: "7%",
    width: "100%",
    marginTop: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLightColor,
  },
  logoContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginLogo: {
    height: "80%",
    resizeMode: "contain",
  },
  sideDrawerIconContainer: {
    width: "15%",
    right: "0%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  duetContainer: {
    width: "100%",
  },
  userThumbnailContainer: {
    flex: 0.2,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  userThumbnail: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userNameContainer: {},
  userNameStyle: {
    fontFamily: fonts.semibold_text,
    fontSize: 16,
    marginLeft: 5,
    marginTop: 10,
  },
  duetUploadTimeStyle: {
    fontFamily: fonts.regular_text,
    color: colors.blackTimeColor,
    fontSize: 13.5,
    marginLeft: 5,
  },
  singleDuetOptionIcon: {},
  duetImageContainer: {
    flex: 0.5,
  },
  duetLeftImageStyle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginRight: 0.5,
  },
  duetRightImageStyle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginLeft: 0.5,
  },
  duetHeartsContainer: {
    width: "100%",
    height: 50,
  },
  duetLeftHeart: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  duetRightHeart: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  duetLeftHeartButton: {
    marginLeft: 8,
  },
  duetRightHeartButton: {
    marginRight: 8,
  },
  duetLeftHeartCounter: {
    fontFamily: fonts.regular_text,
    color: colors.black,
    fontSize: 16,
  },
  duetCommentContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  userNameCommentStyle: {
    fontFamily: fonts.semibold_text,
    fontSize: 16,
    marginLeft: 5,
  },
  duetCommentTextStyle: {
    fontFamily: fonts.regular_text,
    fontSize: 16,
    marginLeft: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  duetsDividerContainer: {
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  duetDividerTextStyle: {
    fontFamily: fonts.regular_text,
    fontSize: 15,
    color: colors.backgroundLight,
  },
  renderLoadMoreStyle: { marginTop: 10, alignItems: "center" },
  singleDuetContainer: {},
  footerContainer: {
    height: "7%",
    width: "100%",
    borderTopWidth: 0.5,
    borderTopColor: colors.borderLightColor,
  },
  footerCameraContainer: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  footerHomeContainer: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: colors.red,
  },
  footerNotificationContainer: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  footerSearchContainer: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  footerIconContainer: {
    width: "30%",
    height: "50%",
  },
  flex_row: {
    flexDirection: "row",
    flex: 1,
  },
});
