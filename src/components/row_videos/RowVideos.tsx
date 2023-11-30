import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./row_viedeos.style";


export default function RowVideos({ item }: { item: VideosWithChannelModel }) {
  return (
    <View style={styles.container} >
      <Image style={styles.imageVideo} source={{ uri: item.thumbVideo }} />
      <View style={styles.rowProfile} >
        <Image style={styles.imageProfile} source={{ uri: item.thumbProfileChannel }} />
        <View style={styles.columnDescription}>
          <Text style={styles.title}  >{item.titleVideo}</Text>
          <Text style={styles.textPublished}>10 min</Text>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.titleButton}>Assinar</Text>
        </Pressable>
      </View>

    </View>
  )
}