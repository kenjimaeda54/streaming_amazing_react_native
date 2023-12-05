import { Image, Text, View } from "react-native";
import { styles } from "./row_subscription.styles";
import { ItemsSnippet } from "@/models/SearchVideoModel";

export default function RowSubscription({ item }: { item: ItemsSnippet }) {
  return (
    <View style={styles.container} >
      <Image style={styles.image} source={{ uri: item.snippet.thumbnails.medium.url }} />
      <Text style={styles.name} numberOfLines={1}>{item.snippet.title}</Text>
    </View>
  )
}