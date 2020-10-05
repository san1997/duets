import styled from "styled-components/native";
import { StyleSheet, StatusBar } from "react-native";

import colors from "../../../../constConfig/colors";

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
    marginTop: 80,
    flex: 1 / 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBoxContainer: {
    marginTop: 20,
    flex: 1 / 10,
    backgroundColor: "silver",
  },
});
