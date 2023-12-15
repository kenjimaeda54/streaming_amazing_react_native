import { Text, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import RowVideos from "@/components/row_videos/RowVideos";
import useUserViewModel from "@/view_models/useUserViewModel";
import useSearchLivesWithChannelViewModel from "@/view_models/useSearchLivesWithChannelViewModel";




export default function LiveScreen() {
  const { isLoading, channelWithVideo } = useSearchLivesWithChannelViewModel()
  const { dataSubscription } = useUserViewModel()


  if (isLoading) {
    return <Text>Loading</Text>
  }

  return (
    <SafeAreaView edges={['top']} style={{
      flex: 1,
      paddingVertical: 10,
      gap: 10,

    }}>
      <FlatList
        data={channelWithVideo}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        contentContainerStyle={{
          paddingHorizontal: 13
        }}
        keyExtractor={(it, index) => `${it.id}-${index}`}
        renderItem={({ item }) => <RowVideos item={item} itensSubscription={dataSubscription.items} />}
      />
    </SafeAreaView>
  )
}


