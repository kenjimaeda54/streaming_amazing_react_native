import theme from "@/theme/theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  rowPresentation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  presentationWelcome: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 15,
    color: theme.colors.gray100
  },
  presentationName: {
    fontFamily: theme.fonts.poppinsBold,
    fontSize: 17,
    color: theme.colors.black100
  },
  rowWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  textSubscriptions: {
    fontFamily: theme.fonts.latoBold,
    fontSize: 25,
    color: theme.colors.black100,

  }
})