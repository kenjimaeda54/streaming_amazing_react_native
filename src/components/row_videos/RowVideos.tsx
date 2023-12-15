import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ItensSubscription, SnippetSubscription } from "@/models/SubscriptionModel";
import theme from "@/theme/theme";


export default function RowVideos({ item, itensSubscription }: { item: VideosWithChannelModel, itensSubscription: ItensSubscription[] }) {
  const isRegistered = !!itensSubscription.find(it => it.snippet.resourceId.channelId === item.channelId)
  return (
    <View style={styles.container} >
      <Image style={styles.imageVideo} source={{ uri: item.thumbVideo }} />
      <View style={styles.rowProfile} >
        <Image defaultSource={{ uri: "http://icon-park.com/imagefiles/movie_play_light_gray.png" }} style={styles.imageProfile} source={{ uri: item.thumbProfileChannel }} />
        <View style={styles.columnDescription}>
          <Text style={styles.title}  >{item.titleVideo}</Text>
        </View>
        {!isRegistered &&
          <Pressable style={styles.button}>
            <Text style={styles.titleButton}>Assinar</Text>
          </Pressable>
        }
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  imageVideo: {
    width: "100%",
    borderRadius: 15,
    height: 180,
  },
  rowProfile: {
    flexDirection: "row",
    gap: 15,
    marginTop: 7,
    alignItems: "center"
  },
  imageProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  columnDescription: {
    flex: 1,
    justifyContent: "space-around",
    gap: 3,
  },
  button: {
    backgroundColor: theme.colors.black100,
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  titleButton: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 15,
    color: theme.colors.white,
  },
  title: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 17,
    color: theme.colors.black100,

  },
  textPublished: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 13,
    color: theme.colors.gray100,
  }
})