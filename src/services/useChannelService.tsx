import { MutableRefObject, useRef } from "react";
import { ChannelModel } from "@/models/ChannelModel"
import { Constants } from "@/utility/Contants"
import api from "./api"
import { QueryObserverResult, useQuery } from "@tanstack/react-query";


export interface IUseChannel {
  data: ChannelModel,
  isLoading: boolean,
  channelId: MutableRefObject<string>,
  refetch: () => Promise<QueryObserverResult<ChannelModel, Error>>
}

async function handleChannel(channelId: string): Promise<ChannelModel> {
  const response = await api.get(`/channels?part=snippet&id=${channelId}&key=AIzaSyC6pfq4kSrvQk1eJ55K6cr_89a2z5HbCPo`, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return response.data;
}


export default function useChannelService(): IUseChannel {
  const channelId = useRef("")

  const { data = {} as ChannelModel, isLoading, refetch } = useQuery({ queryKey: [Constants.channel], queryFn: () => handleChannel(channelId.current) })


  return {
    data,
    isLoading,
    channelId,
    refetch
  }


}