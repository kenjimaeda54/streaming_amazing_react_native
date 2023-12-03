import { SearchVideoModel, VideoModel } from "@/models/SearchVideoModel";
import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import useChannelService from "@/services/useChannelService";
import useSearchVideoService from "@/services/useSearchVideoService";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface IUseSearchViewModel {
  videosWithChannel: VideosWithChannelModel[]
  isLoadingChannel: boolean
  isLoadingSearchVideo: boolean,
  isSuccess: boolean
}


export default function useSearchViewModel(): IUseSearchViewModel {
  const [videosWithChannel, setVideosWithChannel] = useState<VideosWithChannelModel[]>([])
  const startEndReachedCalledDuringMomentum = useRef(true)
  const { data: dataSearchVideo, isLoading: isLoadingSearchVideo, isSuccess } = useSearchVideoService()
  const { data: dataChannel, isLoading: isLoadingChannel, channelId, refetch } = useChannelService()

  useEffect(() => {


    if (isSuccess && !isLoadingSearchVideo) {
      const listIdChannel = dataSearchVideo.items.map(it => it.snippet.channelId)
      listIdChannel.forEach(id => {

        channelId.current = id;
        refetch().then((channel) => {
          const findVideo = dataSearchVideo.items.find(it => it.snippet.channelId === id)
          if (channel.error == null && findVideo != null && channel.data != null) {
            const data: VideosWithChannelModel[] = [
              {
                thumbVideo: findVideo.snippet.thumbnails.high.url,
                thumbProfileChannel: channel.data.items[0].snippet.thumbnails.medium.url,
                titleVideo: findVideo.snippet.title, isSubscribed: false, publishedVideo: findVideo.snippet.publishedAt,
              }
            ]
            setVideosWithChannel(previous => [...previous, ...data])
          }
        })

      })



    }
  }, [dataSearchVideo, dataChannel])






  return {
    videosWithChannel,
    isLoadingChannel,
    isLoadingSearchVideo,
    isSuccess
  }
}