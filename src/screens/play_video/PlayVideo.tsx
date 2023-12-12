import { VideosWithChannelModel } from "@/models/VideosWithChannelModel"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./play_video.style"
import YouTube from "react-native-youtube"
import useVideoViewModel from "@/view_models/useVideosViewModel"
import { useEffect } from "react"
import { BlurView } from "@react-native-community/blur"



export default function PlayVideo() {
  const { params } = useRoute()
  const { goBack } = useNavigation()
  const { handleSearchVideo, video, isLoading } = useVideoViewModel()
  const videoWithChannel = params as VideosWithChannelModel


  useEffect(() => {

    if (videoWithChannel !== null) {
      handleSearchVideo(videoWithChannel.videoId)
    }

  }, [videoWithChannel, isLoading])


  if (videoWithChannel === null || isLoading || video?.items.length <= 0) {
    return <Text>Carregando</Text>
  }


  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
      <YouTube
        videoId={videoWithChannel.videoId}
        apiKey="AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw"
        style={styles.youtubeControl}
        showinfo={false}
        modestbranding={false}
        rel={false}
      />
      <BlurView blurType="light" blurAmount={10} style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.touchButtonBack} >
          <Image source={require("../../../assets/images/app/back.png")} style={styles.imageBack} resizeMode="cover" />
        </TouchableOpacity>
      </BlurView>
      <View style={styles.contentBody} >
        <Text style={styles.titleVideo} numberOfLines={2}  >{videoWithChannel.titleVideo}</Text>
        <View style={styles.rowHeader}>
          <Text style={styles.textPublishedVideo} >{videoWithChannel.publishedVideo}</Text>
          <Text style={styles.textPublishedVideo} >{video.items[0].statistics.viewCount}</Text>
          <Text style={styles.textPublishedVideo}>{video.items[0].snippet.channelTitle}</Text>
        </View>
        <View style={styles.rowChannel} >
          <Image source={{ uri: videoWithChannel.thumbProfileChannel }} style={styles.thumbChannel} />
          <Text style={styles.textNameChannel}>{video.items[0].snippet.channelTitle}</Text>
          <Text style={styles.textSubscription}>{videoWithChannel.subscriberCountChannel}</Text>
        </View>
        <Text style={styles.textDescription}>
          {video.items[0].snippet.description}
        </Text>
      </View>

    </ScrollView>


  )

}