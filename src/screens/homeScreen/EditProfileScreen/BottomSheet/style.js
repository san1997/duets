import { StyleSheet, Platform, Dimensions } from "react-native";

export const bottomSheetStyles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    height: 250,
    backgroundColor: "white",
    borderRadius: 25,
    marginHorizontal: 15,
  },
  contianer: {
    flex: 1,
    //backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  outSideView: {
    flex: 1,
    width: "100%",
  },
  touchableView: {
    flex: 1,
    width: "100%",
  },
  mainView: {
    backgroundColor: "white",
    width: "95%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: "2.5%",
    height: Dimensions.get("window").height * 0.3,
  },
  title: {
    color: "#182344",
    fontSize: 20,
    margin: 10,
    fontWeight: "500",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
    fontFamily: "SourceSansPro-SemiBold",
  },
  titleContainer: {
    marginVertical: 5,
  },
  textOptions: {
    color: "#182344",
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 25,
    fontFamily: "SourceSansPro-Regular",
  },
  textOptionsContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
});
