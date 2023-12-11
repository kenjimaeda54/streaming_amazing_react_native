import theme from "@/theme/theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    gap: 10,
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center'
  },

  columnContent: {
    gap: 20,

  },
  textSingOut: {
    fontFamily: theme.fonts.poppinsMedium,
    fontSize: 18,
    color: theme.colors.red,
    marginTop: 50,
  }
})