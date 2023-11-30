import { Image, Text, View } from "react-native";
import { styles } from "./row_subscription.styles";

export default function RowSubscription({ item }: { item: SubscriptionModel }) {
  return (
    <View style={styles.container} >
      <Image style={styles.image} source={{ uri: item.linkIcon }} />
      <Text style={styles.name} >{item.name}</Text>
    </View>
  )
}