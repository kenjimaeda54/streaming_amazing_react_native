import BackButton from "@/components/back_button/BackButton";
import { DataSubscriptionSkeleton } from "@/components/skeletoon/Skeletons";
import { PlayListItem } from "@/models/PlayListItem";
import { ItensSubscription } from "@/models/SubscriptionModel";
import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import theme from "@/theme/theme";
import useUserViewModel from "@/view_models/useUserViewModel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function RowVideoSubscription({ item }: { item: PlayListItem | undefined }) {
  const linkImage = item?.items[0].snippet.thumbnails?.high !== undefined ? item.items[0].snippet.thumbnails.high.url : "https://telhafer.com.br/image/no_image.jpg"

  return (
    <>
      {item?.items[0].snippet.thumbnails?.high !== undefined &&
        <>
          <Image style={styles.logoVideo} source={{ uri: linkImage }} />
          <View style={styles.columnDescription}>
            <Text style={styles.titleVideo} numberOfLines={2}>{item?.items[0].snippet.title}</Text>
            <Text style={styles.textDescription} numberOfLines={2} >{item?.items[0].snippet.description}</Text>
          </View>
        </>
      }
    </>
  )

}

export default function SubscriptionVideos() {
  const { params } = useRoute()
  const { navigate } = useNavigation()
  const { dataPlayListSubscription, isLoadingDataSubscription, handleWithChannelSubscription, isLoadingChannel, handleSearchChannel, channel } = useUserViewModel()
  const channelSubscription = params as ItensSubscription

  useEffect(() => {
    if (channel !== undefined) {
      handleWithChannelSubscription(channelSubscription.snippet.resourceId.channelId)
      handleSearchChannel(channelSubscription.snippet.resourceId.channelId)
    }
  }, [channel])


  if (isLoadingDataSubscription && channel === undefined || isLoadingChannel || Object.entries(channel).length === 0) {
    return <DataSubscriptionSkeleton />
  }


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.rowHeader}>
        <View style={styles.containerButton}>
          <BackButton />
        </View>
        <View style={styles.rowPresentation}>
          <Image source={{ uri: channel.items[0].snippet.thumbnails.medium.url }} style={styles.avatarChannel} />
          <Text style={styles.textChannelTitle}>{channel.items[0].snippet.title}</Text>
        </View>
      </View>
      {

        dataPlayListSubscription.length === 0 ?
          <View style={styles.containerEmptyPlayList} >
            <Text style={styles.textEmpty}>Sem playlist</Text>
          </View>

          :
          <FlatList
            style={{
              marginBottom: 100
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 25,
            }}
            data={dataPlayListSubscription}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item }) => {
              const params: VideosWithChannelModel = {
                thumbVideo: item?.items[0].snippet.thumbnails.high.url ?? "",
                thumbProfileChannel: channel.items[0].snippet.thumbnails.medium.url,
                titleVideo: item?.items[0].snippet.title ?? "",
                isSubscribed: false,
                publishedVideo: item?.items[0].snippet.publishedAt ?? "",
                id: item?.items[0].id ?? "",
                videoId: item?.items[0].snippet.resourceId.videoId ?? "",
                descriptionVideo: item?.items[0].snippet.description ?? "",
                subscriberCountChannel: channel.items[0].statistics.subscriberCount,
                channelId: channel.items[0].id
              }
              return (
                <Pressable onPress={() => navigate("stackRoute", { screen: 'playVideo', params: params })}>
                  <RowVideoSubscription item={item} />
                </Pressable>

              )
            }} />
      }

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    gap: 20,
  },
  rowHeader: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  rowPresentation: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  containerButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.gray100,
    opacity: 0.4,
  },
  avatarChannel: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textChannelTitle: {
    fontFamily: theme.fonts.poppinsBold,
    fontSize: 25,
    color: theme.colors.black100
  },
  logoVideo: {
    width: "100%",
    borderRadius: 15,
    height: 180,
  },
  columnDescription: {
    gap: 5,
    marginTop: 5
  },
  titleVideo: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 18,
    color: theme.colors.black100
  },
  textDescription: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 15,
    lineHeight: 20,
    color: theme.colors.black100
  },
  containerEmptyPlayList: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontFamily: theme.fonts.latoBlack,
    fontSize: 25,
    color: theme.colors.black100
  }
})