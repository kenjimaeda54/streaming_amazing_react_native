import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./row_viedeos.style";
import { ItemsSnippet } from "@/models/SearchVideoModel";


export default function RowVideos({ item, snippetSubscription }: { item: VideosWithChannelModel, snippetSubscription: ItemsSnippet[] }) {
  const isSigned = !!snippetSubscription?.find(it => it.snippet.channelId === item.id)

  return (
    <View style={styles.container} >
      <Image style={styles.imageVideo} source={{ uri: item.thumbVideo }} />
      <View style={styles.rowProfile} >
        <Image defaultSource={{ uri: "http://icon-park.com/imagefiles/movie_play_light_gray.png" }} style={styles.imageProfile} source={{ uri: item.thumbProfileChannel }} />
        <View style={styles.columnDescription}>
          <Text style={styles.title}  >{item.titleVideo}</Text>
          <Text style={styles.textPublished}>10 min</Text>
        </View>
        {!isSigned &&
          <Pressable style={styles.button}>
            <Text style={styles.titleButton}>Assinar</Text>
          </Pressable>
        }
      </View>

    </View>
  )
}