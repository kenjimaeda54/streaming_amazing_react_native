import { Constants } from "@/utility/Contants";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { MutableRefObject, useRef } from "react";
import api from "./api";
import { VideoModel } from "@/models/VideoModel";
import { API_KEY } from "@env"
export interface IUseVideoService {
  isLoading: boolean,
  videoId: MutableRefObject<string>,
  refetch: () => Promise<QueryObserverResult<VideoModel, Error>>
}


async function getVideoById(videoId: string): Promise<VideoModel> {
  const response = await api.get(`/videos?part=snippet&part=statistics&id=${videoId}&key=${API_KEY}`)
  return response.data
}

export default function useVideoService(): IUseVideoService {
  const videoId = useRef("")

  const { data = {} as VideoModel, isLoading, refetch } = useQuery({ queryKey: [Constants.videos, videoId.current], queryFn: () => getVideoById(videoId.current) })

  return {
    isLoading,
    videoId,
    refetch
  }

}