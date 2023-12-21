import { ChannelModel } from "@/models/ChannelModel"
import api from "./api"
import { MutableRefObject, useRef } from "react"
import { QueryObserverResult, useQuery } from "@tanstack/react-query"
import { Constants } from "@/utility/Contants"
import { API_KEY } from "@env"


interface IUseChannelService {
  refetch: () => Promise<QueryObserverResult<ChannelModel, Error>>
  isLoading: boolean
  channelId: MutableRefObject<string>
}

export async function fetchSearchChannel(channelId: string): Promise<ChannelModel> {
  const response = await api.get(`/channels?part=statistics&part=snippet&id=${channelId}&key=${API_KEY}`, {
    headers: {
      "Content-Type": "application/json",
    },

  })
  return response.data as ChannelModel
}




export function useChannelService(): IUseChannelService {
  const channelId = useRef("")


  const { refetch, isLoading } = useQuery({ queryKey: [Constants.channelVideosSearch], queryFn: () => fetchSearchChannel(channelId.current) })


  return {
    refetch,
    isLoading,
    channelId,
  }
}