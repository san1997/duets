import styled from "styled-components/native";
import { StyleSheet, Platform } from "react-native";

import colors from "../../../constConfig/colors";
import fonts from "../../../constConfig/fonts";

export const EditProfilePageStyles = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const editProfilePageStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    alignItems: "center",
    backgroundColor: colors.profileLightBlue,
  },
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.profileLightBlue,
    alignItems: "center",
    marginTop: 30,
    width: 150,
  },
  buttonContainer: {
    alignItems: "center",
  },
  editImageContainer: {
    marginVertical: 15,
    alignItems: "center",
  },
  editTextPlusProfileContainer: {
    backgroundColor: colors.profileLightBlue,
  },
  editContainer: {
    alignItems: "center",
    backgroundColor: colors.profileLightBlue,
    paddingBottom: 20,
  },
  editProfileTextContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  atTextStyle: {
    fontSize: 20,
    marginTop: -5,
    fontFamily: fonts.semibold_text,
  },
  panelButton: {
    fontSize: 17,
    fontFamily: fonts.regular_text,
    color: colors.anotherGrey,
  },
  action: {
    flexDirection: "row",
    marginVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLightColor,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  saveAndLogoutButtonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.regular_text,
    fontSize: 15,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 12,
  },
  editTextContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.profileLightBlue,
    alignItems: "center",
  },
  editTextStyle: {
    fontSize: 17,
    fontFamily: fonts.regular_text,
    color: colors.anotherGrey,
  },
});
