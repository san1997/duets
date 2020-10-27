import { StyleSheet, StatusBar, Platform } from "react-native";

export const PreviewScreenStyles = StyleSheet.create({
  actionItems: {
    position: 'absolute',
    top: '85%',
    left: '45%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  refresh: {
    position: 'absolute',
    top: '85%',
    left: '15%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  heading: {
    position: 'absolute',
    top: '5%',
    left: '35%',
    color: 'white',
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontSize: 20
  }
});
