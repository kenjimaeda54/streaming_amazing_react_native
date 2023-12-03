import theme from "@/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  imageVideo: {
    width: "100%",
    borderRadius: 15,
    height: 180,
  },
  rowProfile: {
    flexDirection: "row",
    gap: 15,
    marginTop: 7,
    alignItems: "center"
  },
  imageProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  columnDescription: {
    flex: 1,
    justifyContent: "space-around",
    gap: 3,
  },
  button: {
    backgroundColor: theme.colors.black100,
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  titleButton: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 15,
    color: theme.colors.white,
  },
  title: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 17,
    color: theme.colors.black100,

  },
  textPublished: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 13,
    color: theme.colors.gray100,
  }
})