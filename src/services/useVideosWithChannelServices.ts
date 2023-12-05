import { SearchVideoModel } from "@/models/SearchVideoModel";
import { Constants } from "@/utility/Contants";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { ChannelModel } from "@/models/ChannelModel";
import { useEffect, useRef, useState } from "react";
import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";


interface IUseSearchVideo {
  isLoading: boolean,
  channelWithVideo: VideosWithChannelModel[],
  isSuccess: boolean,


}

async function searchVideo(signal: AbortSignal): Promise<SearchVideoModel> {
  const response = await api.get(`/search?part=snippet&relevanceLanguage=pt&maxResults=10&videoDuration=medium&type=video&regionCode=BR&key=AIzaSyC6pfq4kSrvQk1eJ55K6cr_89a2z5HbCPo`, {
    headers: {
      "Content-Type": "application/json",
    },
    signal
  })
  return response.data
}



export default function useVideosWithChannelService(): IUseSearchVideo {
  const [channelWithVideo, setChannelWithVideo] = useState<VideosWithChannelModel[]>([])



  const { data: dataSearchVideo = {} as SearchVideoModel, isSuccess, isLoading } = useQuery({
    queryKey: [Constants.searchMovie],
    queryFn: ({ signal }) => searchVideo(signal),
  })


  //quando precisar fazer uma request encadeada e melhor nao usar o react query para isso
  if (isSuccess) {
    dataSearchVideo.items.forEach(async it => {

      const response = await api.get(`/channels?part=snippet&id=${it.snippet.channelId}&key=AIzaSyC6pfq4kSrvQk1eJ55K6cr_89a2z5HbCPo`, {
        headers: {
          "Content-Type": "application/json",
        },

      })
      const data: VideosWithChannelModel = {
        thumbVideo: it.snippet.thumbnails.high.url,
        thumbProfileChannel: response.data.items[0].snippet.thumbnails.medium.url ?? "",
        isSubscribed: false,
        publishedVideo: it.snippet.publishedAt,
        titleVideo: it.snippet.title
      }
      setChannelWithVideo(previous => [...previous, data])

    })



  }



  return {
    channelWithVideo,
    isLoading,
    isSuccess
  }

}