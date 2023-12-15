import { SearchVideoModel } from "@/models/SearchVideoModel";
import { Constants } from "@/utility/Contants";
import { useQueries, useQuery } from "@tanstack/react-query";
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
  const response = await api.get(`/search?part=snippet&relevanceLanguage=pt&maxResults=10&videoDuration=medium&type=video&regionCode=BR&key=AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw`, {
    headers: {
      "Content-Type": "application/json",
    },
    signal
  })
  return response.data
}


async function searchChannel(channelId: string): Promise<ChannelModel> {
  const response = await api.get(`/channels?part=statistics&part=snippet&id=${channelId}&key=AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw`, {
    headers: {
      "Content-Type": "application/json",
    },

  })
  return response.data as ChannelModel
}

export default function useVideosWithChannelService(): IUseSearchVideo {


  const { data: dataSearchVideo = {
    items: [],
    kind: "",
    etag: "",
    nextPageToken: "",
    regionCode: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0
    }
  } as SearchVideoModel, isSuccess: successSearchVideo } = useQuery({
    queryKey: [Constants.searchVideos],
    queryFn: ({ signal }) => searchVideo(signal),
  })



  //aqui precisa ser um um id presente no seu array para que o useQueries considera instavel e para de fazer request$
  const ids = dataSearchVideo.items.map(it => it.snippet.channelId)
  const combineQueries = useQueries({
    queries: ids.map(it => {
      return {
        queryKey: [Constants.channelVideos, `${it}`],
        queryFn: () => searchChannel(it),
        enabled: successSearchVideo,
      }
    }),
    combine(results) {
      return ({
        data: dataSearchVideo.items.map(video => {
          const findChannel = results.find(it => it.data?.items[0].id === video.snippet.channelId)

          if (findChannel !== undefined) {
            const { data } = findChannel
            return {
              id: data?.items[0].id,
              thumbProfileChannel: data?.items[0].snippet.thumbnails.medium.url,
              thumbVideo: video.snippet.thumbnails.high.url,
              isSubscribed: false,
              publishedVideo: video.snippet.publishedAt,
              titleVideo: video.snippet.title,
              descriptionVideo: video.snippet.description,
              videoId: video.id.videoId,
              subscriberCountChannel: data?.items[0].statistics.subscriberCount,
              channelId: video.snippet.channelId
            } as VideosWithChannelModel

          } else {
            return {} as VideosWithChannelModel
          }

        }),
        isSuccess: results.some(it => it.isSuccess),
        isLoading: results.some(it => it.isLoading)
      })
    },
  })




  return {
    channelWithVideo: combineQueries.data,
    isLoading: combineQueries.isLoading,
    isSuccess: combineQueries.isSuccess
  }

}