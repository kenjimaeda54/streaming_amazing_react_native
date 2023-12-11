import { styles } from "./column_title_subtitle.style"
import { Text, View } from "react-native"

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