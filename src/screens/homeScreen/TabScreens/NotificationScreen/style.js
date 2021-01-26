import styled from "styled-components/native";
import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

import colors from "../../../../constConfig/colors";
import fonts from "../../../../constConfig/fonts";

const width = Dimensions.get("window");

export const notificationScreenStyle = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  notificationPageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notificationContainer: {
    width: "100%",
  },
  singleNotificationSectionStyle: {
    width: "100%",
    padding: 20,
  },
  notificationTextStyle: {
    fontFamily: fonts.regular_text,
    fontSize: 15,
  },
  renderLoadMoreStyle: { marginTop: 10, alignItems: "center" },
});
