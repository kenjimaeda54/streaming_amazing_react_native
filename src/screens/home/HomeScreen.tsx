import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emojiFromUtf16 } from "rn-emoji-picker"
import { styles } from "./home.styles";
import { FlatList } from "react-native-gesture-handler";
import RowSubscription from "@/components/row_subscription/RowSubscription";
import RowVideos from "@/components/row_videos/RowVideos";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { useShallow } from "zustand/react/shallow";
import useUserViewModel from "@/view_models/useUserViewModel";
import useSearchVideoWithChannelViewModel from "@/view_models/useSearchVideoWithChannelViewModel";




export default function HomeScreen() {
  const { isLoading, channelWithVideo } = useSearchVideoWithChannelViewModel()
  const { userStore } = useUserAuthenticationStore(useShallow(state => ({ userStore: state.user })))
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
      <View style={styles.rowPresentation}>
        <Image source={userStore.user.photo != null ? { uri: userStore.user.photo } : require("../../../assets/images/bottom_tab/avatar_user.png")} style={{ width: 60, height: 60, borderRadius: userStore.user.photo != null ? 30 : 0, }} />
        <View>
          <View style={styles.rowWelcome}>
            <Text style={styles.presentationWelcome}>Bem vindo</Text>
            <Text>{emojiFromUtf16('1F44B')} </Text>
          </View>
          <Text style={styles.presentationName}>{userStore.user.givenName}</Text>
        </View>
      </View>
      <Text style={styles.textSubscriptions}>Assinaturas</Text>
      <FlatList
        style={{
          height: 120
        }}
        data={dataSubscription.items}
        keyExtractor={(_, index) => `${index}`}
        snapToOffsets={[...Array(dataSubscription.items).map((_, i) => i * (70 - 30) + (i - 1) * 30)]}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        renderItem={RowSubscription}
      />
      <FlatList
        data={channelWithVideo}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        contentContainerStyle={{
          paddingHorizontal: 13
        }}
        keyExtractor={(it, index) => `${it.id}-${index}`}
        renderItem={({ item }) => <RowVideos item={item} snippetSubscription={dataSubscription.items} />}
      />
    </SafeAreaView>
  )
}


