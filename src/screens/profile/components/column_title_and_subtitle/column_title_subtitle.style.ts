import theme from "@/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  column: {
    gap: 5,
  },
  title: {
    fontFamily: theme.fonts.latoBlack,
    fontSize: 21,
    color: theme.colors.black100
  },
  subTitle: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 19,
    color: theme.colors.gray100
  }
})