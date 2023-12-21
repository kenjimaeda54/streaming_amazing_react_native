import { Pressable, Text, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import RowVideos from "@/components/row_videos/RowVideos";
import useUserViewModel from "@/view_models/useUserViewModel";
import useSearchLivesWithChannelViewModel from "@/view_models/useSearchLivesWithChannelViewModel";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LiveSkeleton } from "@/components/skeletoon/Skeletons";
import { useNavigation } from "@react-navigation/native";




export default function LiveScreen() {
  const { isLoading, channelWithVideo } = useSearchLivesWithChannelViewModel()
  const { dataSubscription } = useUserViewModel()
  const { navigate } = useNavigation()


  if (isLoading) {
    return <LiveSkeleton />
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
        renderItem={({ item }) => <Pressable onPress={() => navigate("stackRoute", { screen: 'playVideo', params: item })}>
          <RowVideos item={item} itensSubscription={dataSubscription.items} />
        </Pressable>}
      />
    </SafeAreaView>
  )
}


