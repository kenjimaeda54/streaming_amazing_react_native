import { VideosWithChannelModel } from "@/models/VideosWithChannelModel"
import { useRoute } from "@react-navigation/native"
import { Image, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./play_video.style"
import YouTube from "react-native-youtube"



export default function PlayVideo() {
  const { params } = useRoute()
  const videoWithChannel = params as VideosWithChannelModel


  if (videoWithChannel === null) {
    return <Text>Parâmetro errado</Text>
  }

  console.log(videoWithChannel)

  return (
    <ScrollView  >
      <YouTube
        videoId={videoWithChannel.videoId}
        apiKey="AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw"
        style={styles.youtubeControl}
        showinfo={false}
        modestbranding={false}
        rel={false}

      />
    </ScrollView>


  )

}