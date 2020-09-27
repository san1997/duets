import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

import colors from "../../../../constConfig/colors";

const width = Dimensions.get("window");

export const fullDuetScreenStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  fullDuetScreenContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  fullDuetContainer: { marginTop: width.width * 0.25 },
  duetFullImageStyle: {
    width: width.width * 0.9,
    marginLeft: width.width * 0.05,
    marginRight: width.width * 0.05,
    height: width.width,
  },
});
