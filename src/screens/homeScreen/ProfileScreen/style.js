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
    backgroundColor: "#fff",
  },
  androidSafeArea: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 25 : 0,
    // alignItems: "center",
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
  flex_row: {
    flexDirection: "row",
    flex: 1,
  },
  userInfoSection: { marginTop: 10 },
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
    marginTop: 15,
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
  userBio: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 8,
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
    color: colors.blackTimeColor,
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
});
