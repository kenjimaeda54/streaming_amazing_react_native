import { VideosWithChannelModel } from "@/models/VideosWithChannelModel"
import { useRoute } from "@react-navigation/native"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import YouTube from "react-native-youtube"
import useVideoViewModel from "@/view_models/useVideosViewModel"
import { useEffect } from "react"
import TimeAgo from "javascript-time-ago"
import ptb from "javascript-time-ago/locale/pt-PT"
import theme from "@/theme/theme"
import BackButton from "@/components/back_button/BackButton"
import { PlayVideoSkeleton } from "@/components/skeletoon/Skeletons"



export default function PlayVideo() {
  const { params } = useRoute()
  const { handleSearchVideo, video, isLoading } = useVideoViewModel()
  const videoWithChannel = params as VideosWithChannelModel

  TimeAgo.addLocale(ptb)



  useEffect(() => {

    if (videoWithChannel !== null) {
      handleSearchVideo(videoWithChannel.videoId)
    }

  }, [videoWithChannel, isLoading])


  if (videoWithChannel === null || isLoading || video?.items?.length <= 0 || video.items === undefined) {
    return <PlayVideoSkeleton />
  }

  function intervalDate(): string {
    const timeAgo = new TimeAgo('pt-PT')
    const datePublished = new Date(videoWithChannel.publishedVideo)
    const date = timeAgo.format(datePublished)
    const firstLetter = date.charAt(0)
    const firstLetterCapitalize = firstLetter.toUpperCase()
    const remainingLetters = date.slice(1)
    return firstLetterCapitalize + remainingLetters
  }

  function formatQuantityView(value: string): String {
    let symbol = ["", "m", "mi", "b", "t", "p", "e"];
    var tier = Math.log10(Math.abs(+value)) / 3 | 0;

    if (tier == 0) return value;


    var suffix = symbol[tier];
    var scale = Math.pow(10, tier * 3);


    var scaled = +value / scale;

    return scaled.toFixed(1) + suffix;
  }


  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
      <YouTube
        videoId={videoWithChannel.videoId}
        play
        apiKey="AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw"
        style={styles.youtubeControl}
        showinfo={false}
        modestbranding={false}
        rel={false}
      />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.contentBody} >
        <Text style={styles.titleVideo} numberOfLines={2}>{videoWithChannel.titleVideo}</Text>
        <View style={styles.rowHeader}>
          <Text style={styles.textPublishedVideo} >{intervalDate()}</Text>
          <Text style={styles.textPublishedVideo} >{formatQuantityView(video.items[0].statistics.viewCount)}</Text>
          <Text style={styles.textPublishedVideo}>{video.items[0].snippet.channelTitle}</Text>
        </View>
        <View style={styles.rowChannel} >
          <Image source={{ uri: videoWithChannel.thumbProfileChannel }} style={styles.thumbChannel} />
          <Text style={styles.textNameChannel}>{video.items[0].snippet.channelTitle}</Text>
          <Text style={styles.textSubscription}>{formatQuantityView(videoWithChannel.subscriberCountChannel)}</Text>
        </View>
        <Text style={styles.textDescription}>
          {video.items[0].snippet.description}
        </Text>
      </View>

    </ScrollView>


  )

}


const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
  thumbVideo: {
    width: "100%"
  },
  youtubeControl: {
    width: "100%",
    height: 450,
  },
  rowHeader: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  header: {
    position: 'absolute',
    top: height * 0.08,
    left: 25,
  },
  titleVideo: {
    fontFamily: theme.fonts.latoBold,
    fontSize: 25,
    color: theme.colors.black100,
    marginTop: 15,
    lineHeight: 35,
    width: "100%",
  },
  contentBody: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 13,
    paddingBottom: 50,
  },
  textPublishedVideo: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 13,
    color: theme.colors.gray100,
  },
  rowChannel: {
    flexDirection: "row",
    gap: 15,
  },
  thumbChannel: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textNameChannel: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 17,
    color: theme.colors.black100,
    marginTop: 15,
    height: "100%",
    alignSelf: "center",

  },
  textSubscription: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 13,
    color: theme.colors.gray100,
    alignSelf: "center",

  },
  textDescription: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 17,
    color: theme.colors.black100,
    lineHeight: 20,
    height: "100%"
  }
})