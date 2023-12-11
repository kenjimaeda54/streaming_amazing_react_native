import { VideosWithChannelModel } from "./VideosWithChannelModel"

export type NavigationModel = {
  home: undefined
  profile: undefined
  live: undefined
  signIn: undefined
  tabNavigator: undefined
  stackRoute: {
    screen: string,
    params: undefined | VideosWithChannelModel
  }
  playVideo: { videoWithChannel: VideosWithChannelModel }
}