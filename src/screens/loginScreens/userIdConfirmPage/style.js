import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import colors from "../../../constConfig/colors";
import fonts from "../../../constConfig/fonts";

export const UserIdConfirmationPageStyles = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const userIdConfirmationPageStyles = StyleSheet.create({
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
  formContainer: {
    width: "100%",
    top: "21%",
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
  loginHeadingContainer: {
    top: "25%",
    padding: 8,
    paddingLeft: 25,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderLightColor,
    backgroundColor: colors.backgroundGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  loginHeading: {
    fontFamily: fonts.regular_text,
    fontSize: 16,
  },
});
