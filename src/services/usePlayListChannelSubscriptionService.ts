import { PlayListModel } from "@/models/PlaylistModel"
import api from "./api"
import { PlayListItem } from "@/models/PlayListItem"
import { MutableRefObject, useRef } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"
import { Constants } from "@/utility/Contants"


interface IUsePlayListService {
  data: (PlayListItem | undefined)[],
  isLoading: boolean,
  refetch: () => void,
  channelId: MutableRefObject<string>
}

async function fetchPlayListItem(playListId: String): Promise<PlayListItem> {
  const response = await api.get(`/playlistItems?part=snippet&maxResults=1&playlistId=${playListId}&key=AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw`)
  return response.data
}

async function fetchPlayList(channelId: string, signal: AbortSignal): Promise<PlayListModel> {
  const response = await api.get(`/playlists?part=id&maxResults=10&channelId=${channelId}&key=AIzaSyAVxRrP61Dw76EUidoiPpfavIdqN62_LBw`, { signal })
  return response.data
}





export default function usePlayListChannelSubscriptionService(): IUsePlayListService {
  const channelId = useRef("")


  const { data = { items: [] } as PlayListModel, isSuccess, refetch, isLoading } = useQuery({ queryKey: [Constants.playListVideosChannel, channelId.current], queryFn: ({ signal }) => fetchPlayList(channelId.current, signal) })


  const ids = data.items.map(it => it.id)
  const combineQueries = useQueries({
    queries: ids.map(it => {
      return {
        queryKey: [Constants.channelVideos, `${it}`],
        queryFn: () => fetchPlayListItem(it),
        enabled: isSuccess,
      }
    }),
    combine(results) {
      return ({
        data: results.map(it => it.data),
        isSuccess: results.some(it => it.isSuccess),
        isLoading: results.some(it => it.isLoading)
      })
    }
  })

  return {
    data: combineQueries.data,
    isLoading: combineQueries.isLoading && isLoading,
    refetch,
    channelId
  }
}