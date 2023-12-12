import theme from "@/theme/theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  thumbVideo: {
    width: "100%"
  },
  youtubeControl: {
    width: "100%",
    height: 450,
  },
  rowHeader: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  titleVideo: {
    fontFamily: theme.fonts.latoBold,
    fontSize: 25,
    color: theme.colors.black100,
    marginTop: 15,
    lineHeight: 35,
    width: "100%",
  },
  contentBody: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 13
  },
  textPublishedVideo: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 13,
    color: theme.colors.gray100,
  },
  rowChannel: {
    flexDirection: "row",
    gap: 15,
  },
  thumbChannel: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textNameChannel: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 17,
    color: theme.colors.black100,
    marginTop: 15,
    height: "100%",
    alignSelf: "center",

  },
  textSubscription: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 13,
    color: theme.colors.gray100,
    alignSelf: "center",

  },
  textDescription: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 17,
    color: theme.colors.black100,
    lineHeight: 20,
    height: "100%"
  }
})