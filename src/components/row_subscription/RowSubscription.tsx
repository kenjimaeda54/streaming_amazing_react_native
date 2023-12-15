import { Image, StyleSheet, Text, View } from "react-native";
import { ItensSubscription } from "@/models/SubscriptionModel";
import theme from "@/theme/theme";

export default function RowSubscription({ item }: { item: ItensSubscription }) {
  return (
    <View style={styles.container} >
      <Image style={styles.image} source={{ uri: item.snippet.thumbnails.medium.url }} />
      <Text style={styles.name} numberOfLines={1}>{item.snippet.title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
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