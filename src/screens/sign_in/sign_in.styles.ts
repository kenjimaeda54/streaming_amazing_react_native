import theme from "@/theme/theme";
import { StyleSheet, TouchableNativeFeedback } from "react-native";


export const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  content: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontFamily: theme.fonts.poppinsBold,
    fontSize: 35,
    color: theme.colors.white,
    textShadowOffset: {
      width: 0,
      height: 3
    },
    textShadowColor: "#000",
    textShadowRadius: 4.65,
  },
  contentText: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 20,
    lineHeight: 35,
    color: theme.colors.white,
    paddingHorizontal: 20,
    textShadowOffset: {
      width: 0,
      height: 3
    },
    textShadowColor: "#000",
    textShadowRadius: 4.65,
  },
  button: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    paddingVertical: 17,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: theme.colors.white
  },
  textButton: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 17,
    lineHeight: 25,
    color: theme.colors.black100,
  }
})