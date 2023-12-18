import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emojiFromUtf16 } from "rn-emoji-picker"
import { FlatList } from "react-native-gesture-handler";
import RowSubscription from "@/components/row_subscription/RowSubscription";
import RowVideos from "@/components/row_videos/RowVideos";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { useShallow } from "zustand/react/shallow";
import useUserViewModel from "@/view_models/useUserViewModel";
import useSearchVideoWithChannelViewModel from "@/view_models/useSearchVideoWithChannelViewModel";
import { useNavigation } from "@react-navigation/native";
import theme from "@/theme/theme";
import { SkeletonHomeScreen } from "@/components/skeletoon/Skeletons";




export default function HomeScreen() {
  const { isLoading: isLoadingSearchVideo, channelWithVideo } = useSearchVideoWithChannelViewModel()
  const { navigate } = useNavigation()
  const { userStore } = useUserAuthenticationStore(useShallow(state => ({ userStore: state.user })))
  const { dataSubscription, isLoadingDataSubscription } = useUserViewModel()

  if (isLoadingSearchVideo || isLoadingDataSubscription) {
    return <SkeletonHomeScreen />
  }


  return (
    <SafeAreaView edges={['top']} >
      <View style={styles.rowPresentation}>
        <Image
          style={[styles.imageAvatar, { borderRadius: userStore.user.photo != null ? 30 : 0 }]}
          source={userStore.user.photo != null ? { uri: userStore.user.photo } : require("../../../assets/images/bottom_tab/avatar_user.png")} />
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
        renderItem={({ item }) => <Pressable onPress={() => navigate("stackRoute", { screen: 'subscriptionVideos', params: item })}  ><RowSubscription item={item} /></Pressable>}
      />
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
    </SafeAreaView >
  )
}


const styles = StyleSheet.create({
  rowPresentation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 13,
  },
  imageAvatar: {
    width: 60, height: 60,
  },
  presentationWelcome: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 15,
    color: theme.colors.gray100
  },
  presentationName: {
    fontFamily: theme.fonts.poppinsBold,
    fontSize: 17,
    color: theme.colors.black100
  },
  rowWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  textSubscriptions: {
    fontFamily: theme.fonts.latoBold,
    fontSize: 25,
    color: theme.colors.black100,
    paddingHorizontal: 13

  }
})