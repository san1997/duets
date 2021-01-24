import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";

import colors from "../../../constConfig/colors";
import fonts from "../../../constConfig/fonts";

export const ProfilePageStyles = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const profilePageStyles = StyleSheet.create({
  profilePageContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profilePageHeaderContainer: {
    flex: 1,
    // backgroundColor: "#f0f8ff",
  },
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#f0f8ff",
  },
  headerContainer: {
    height: "7%",
    width: "100%",
    marginTop: 3,
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
  editProfileIconContainer: {
    right: "38%",
    top: "78%",
    position: "absolute",
  },
  FollowButtonStyle: {
    paddingLeft: 8,
    paddingTop: 16,
  },
  userInfoSection: { paddingTop: 20, backgroundColor: "#f0f8ff" },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
  },
  captionContainer: {
    marginTop: -5,
    alignItems: "center",
  },
  NameContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 8,
    borderRadius: 8,
    width: Dimensions.get("window").width * 0.9,
    marginLeft: Dimensions.get("window").width * 0.05,
    height: Dimensions.get("window").height / 12,
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoBoxWrapperContainer: {
    flex: 0.5,
    backgroundColor: "#f0f8ff",
    paddingTop: 12,
    marginBottom: 15,
  },
  infoBox: {
    alignItems: "center",
    width: Dimensions.get("window").width / 4,
  },
  infoBoxNumbers: {
    fontSize: 19,
  },
  userProfilePic: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profileUserNameContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  FollowContainer: {
    marginBottom: 12,
  },
  userBio: {
    alignContent: "center",
  },
  bioTextStyle: {
    color: colors.anotherGrey,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: fonts.regular_text,
    lineHeight: 26,
  },
  uploadContainer: {
    // marginTop: 15,
  },
  uploadTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  uploadText: {
    fontSize: 18,
    fontFamily: fonts.regular_text,
    color: colors.anotherGrey,
  },
  duetDividerTextStyle: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.backgroundGrey,
  },
  duetContainer: {
    width: "100%",
  },
  renderLoadMoreStyle: { marginTop: 10, alignItems: "center" },
  userNameCommentStyle: {
    fontSize: 15,
    fontFamily: fonts.semibold_text,
  },
  flex_row: {
    flexDirection: "row",
    flex: 1,
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
    color: colors.blackForTimer,
    fontSize: 13.5,
    marginLeft: 5,
  },
  singleDuetOptionIcon: { top: 10, marginRight: 16 },
  singleDuetContainer: {},
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
  duetsDividerContainer: {
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  // FollowContainer: {
  //   paddingTop: 2,
  //   paddingBottom: 2,
  // },
  followButtonContainer: {
    width: "100%",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    alignItems: "center",
    top: "20%",
    // backgroundColor: "#111",
  },
  followButtonTextStyle: {
    fontFamily: fonts.regular_text,
    color: "#fff",
    fontSize: 15,
  },
  followingButtonTextStyle: {
    fontFamily: fonts.regular_text,
    color: "#fff",
    fontSize: 15,
  },
});
