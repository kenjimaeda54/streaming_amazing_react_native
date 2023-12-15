import theme from "@/theme/theme"
import { StyleSheet, Text, View } from "react-native"

interface IColumnTitleAndSubTitle {
  title: string,
  subTitle: string
}

export default function ColumnTitleAndSubTitle({ title, subTitle }: IColumnTitleAndSubTitle) {
  return (
    <View style={styles.column}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
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