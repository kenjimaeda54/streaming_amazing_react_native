import { SearchVideoModel } from "@/models/SearchVideoModel";
import { Constants } from "@/utility/Contants";
import { useQueries, useQuery } from "@tanstack/react-query";
import api from "./api";
import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import { fetchSearchChannel } from "./useChannelService";
import { API_KEY } from "@env"

interface IUseSearchVideo {
  isLoading: boolean,
  channelWithVideo: VideosWithChannelModel[],
  isSuccess: boolean,


}

async function searchVideo(signal: AbortSignal): Promise<SearchVideoModel> {
  const response = await api.get(`/search?part=snippet&relevanceLanguage=pt&maxResults=10&videoDuration=medium&type=video&regionCode=BR&key=${API_KEY}`, {
    headers: {
      "Content-Type": "application/json",
    },
    signal
  })
  return response.data
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
        queryFn: () => fetchSearchChannel(it),
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