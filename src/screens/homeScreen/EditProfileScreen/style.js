import styled from "styled-components/native";
import { StyleSheet, Platform, Dimensions } from "react-native";

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
    paddingTop: Platform.OS === "android" ? 20 : 0,
    alignItems: "center",
  },
  container: {
    // flex: 1,
    // alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    marginTop: 10,
    width: 200,
  },
  buttonContainer: {
    alignItems: "center",
  },
  editImageContainer: {
    marginVertical: 30,
    alignItems: "center",
    height: Dimensions.get("window").height / 6,
    width: Dimensions.get("window").height / 6,
    overflow: "hidden",
  },
  editContainer: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  panelButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingVertical: 5,
  },
  saveAndLogoutButtonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
  },
});
