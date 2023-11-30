import theme from "@/theme/theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    width: 70,
    marginHorizontal: 13,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 15,
    color: theme.colors.black100,
    textAlign: "center",

  }
})