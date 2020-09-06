import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import colors from "../../constConfig/colors";
import fonts from "../../constConfig/fonts";

export const LoginPageStyles = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #222;
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

export const loginStyles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    width: "70%",
    top: "10%",
    alignItems: "center",
  },
  loginLogo: {
    width: 80,
    height: 80,
  },
  loginText: {
    top: "12%",
    textAlign: "center",
    fontFamily: fonts.regular_text,
    color: colors.grey,
  },
  loginHeadingContainer: {
    position: "absolute",
    top: "30%",
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
    position: "absolute",
    width: "100%",
    top: "40%",
    alignItems: "center",
  },
  loginForminput: {
    width: "75%",
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderLightColor,
    borderRadius: 7,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: fonts.regular_text,
  },
  forgotPassContainer: {
    position: "absolute",
    width: "75%",
    top: "55%",
    marginTop: 3,
    alignItems: "flex-end",
  },
  forgotPassHeading: {
    color: colors.linkColor,
    fontFamily: fonts.regular_text,
  },
  orDivContainer: {
    position: "absolute",
    top: "65%",
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
    position: "absolute",
    top: "70%",
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
  goToHomeButton: {
    position: "absolute",
    top: "90%",
  },
});
