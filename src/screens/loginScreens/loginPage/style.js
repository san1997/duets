import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import colors from "../../../constConfig/colors";
import fonts from "../../../constConfig/fonts";

export const LoginPageStyles = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const loginStyles = StyleSheet.create({
  LoginPageStyles: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  logoContainer: {
    width: "70%",
    top: "10%",
    alignItems: "center",
  },
  loginLogo: {
    width: 80,
    height: 80,
  },
  loginText: {
    top: "10%",
    textAlign: "center",
    fontFamily: fonts.regular_text,
    color: colors.grey,
  },
  loginHeadingContainer: {
    top: "15%",
    backgroundColor: colors.backgroundLight,
    width: "100%",
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginHeading: {
    fontFamily: fonts.regular_text,
    fontSize: 18,
  },
  loginFormContainer: {
    width: "100%",
    top: "20%",
    alignItems: "center",
  },
  loginForminput: {
    width: "80%",
    padding: 6,
    borderWidth: 1,
    borderColor: colors.borderLightColor,
    borderRadius: 7,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: fonts.regular_text,
    fontSize: 14,
  },

  thirdPartyLogin: {
    top: "25%",
  },
  continueContainer: {
    width: "80%",
    padding: 11,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: "center",
    top: "20%",
    borderColor: colors.borderLightColor,
  },
  continueDiv: {
    color: colors.textLightColor,
    fontFamily: fonts.regular_text,
  },
  forgotPassContainer: {
    width: "75%",
    top: "21%",
    marginTop: 3,
    alignItems: "flex-end",
  },
  forgotPassHeading: {
    color: colors.linkColor,
    fontFamily: fonts.regular_text,
  },
  orDivContainer: {
    top: "28%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  orDivText: {
    fontFamily: fonts.regular_text,
    fontSize: 15,
    color: colors.borderLightColor,
  },
  signupHeadingContainer: {
    top: "30%",
    backgroundColor: colors.backgroundLight,
    width: "100%",
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  signupHeading: {
    fontFamily: fonts.regular_text,
    fontSize: 18,
  },
  flex_row: {
    flexDirection: "row",
  },
});
