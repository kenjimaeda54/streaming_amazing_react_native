import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import useLiveServices from "@/services/useLiveService";



interface IUseSearchViewModel {
  channelWithVideo: VideosWithChannelModel[]
  isLoading: boolean
}


export default function useSearchLivesWithChannelViewModel(): IUseSearchViewModel {
  const { channelWithVideo, isLoading } = useLiveServices()


  return {
    channelWithVideo,
    isLoading,
  }
}