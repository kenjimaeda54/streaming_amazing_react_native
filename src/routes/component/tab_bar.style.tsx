import theme from "@/theme/theme";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black100,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    paddingVertical: 4,
    paddingHorizontal: 3,
    borderRadius: 60,
    elevation: 6,
    marginHorizontal: 60
  },

})

export const styleButton = (isFocused: boolean) => StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: isFocused ? theme.colors.black100 : 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
})