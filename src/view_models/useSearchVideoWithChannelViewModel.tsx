import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import useVideosWithChannelService from "@/services/useVideosWithChannelServices";


interface IUseSearchViewModel {
  channelWithVideo: VideosWithChannelModel[]
  isLoading: boolean
}


export default function useSearchVideoWithChannelViewModel(): IUseSearchViewModel {
  const { channelWithVideo, isLoading } = useVideosWithChannelService()


  return {
    channelWithVideo,
    isLoading,
  }
}