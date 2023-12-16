import { ChannelModel } from "./ChannelModel"
import { ItensSubscription, SnippetSubscription } from "./SubscriptionModel"
import { VideosWithChannelModel } from "./VideosWithChannelModel"

export type NavigationModel = {
  home: undefined
  profile: undefined
  live: undefined
  signIn: undefined
  tabNavigator: undefined
  stackRoute: {
    screen: "playVideo" | "subscriptionVideos",
    params: undefined | VideosWithChannelModel | ItensSubscription
  },
  playVideo: { videoWithChannel: VideosWithChannelModel }
  subscriptionVideos: { channel: ItensSubscription }
}