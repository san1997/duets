import { StyleSheet, StatusBar, Platform } from "react-native";

import fonts from "../../../../constConfig/fonts";
import colors from "../../../../constConfig/colors";

export const DuetPreviewStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#f0f8ff",
  },
  topline: {
    flexDirection: 'row',
    top: "3%",
    paddingBottom: "2%"
  },
  backButton: {
    flex: 2,
    zIndex: 1,
    marginLeft: "5%",
  },
  heading: {
    flex: 6,
    top: "3%"
  },
  fontHeading: {
    fontSize: 16,
    fontFamily: fonts.regular_text,
    left: "20%"
  },
  fontShare: {
    fontSize: 20,
    fontFamily: fonts.semibold_text,
  },
  shareButton: {
    flex: 2,
    zIndex: 1,
    top: "2%"
  },
  headline: {
    top: "10%",
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  captionline: {
    top: "45%",
    width: "80%",
    left: "10%",
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    top: "25%",
    left: "40%",
    backgroundColor: "yellow"
  },
  captionbox:{
    top: "35%",
    width: "70%",
    textAlign: "center",
    left: "15%",
  },
  showDuet: {
    backgroundColor: colors.profileLightBlue,
    flex: 3,
    flexDirection: "row",
    alignItems: "center"
  },
  duetNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  duetNumberText: {
    fontSize: 40,
    fontStyle: 'italic',
  },
  duetNumberTextSuper: {
    fontSize: 16,
    fontStyle: 'italic'
  }
});
