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
  container: {
    flex: 1,
  },
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    alignItems: "center",
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
  editProfileIconContainer: {
    width: "15%",
    right: "0%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  flex_row: {
    flexDirection: "row",
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "normal",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "900",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 8,
    padding: 5,
    borderRadius: 8,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height / 11,
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoBox: {
    alignItems: "center",
    paddingVertical: 5,
    width: Dimensions.get("window").width / 4,
  },
  userProfilePic: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userNameContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  userBio: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  uploadContainer: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#777777",
  },
  uploadText: {
    paddingTop: 5,
    fontSize: 18,
  },
});
