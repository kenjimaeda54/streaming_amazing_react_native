import { VideoModel } from "@/models/VideoModel";
import useVideoService from "@/services/useVideoService";
import { useEffect, useState } from "react";

interface IUseVideoModel {
  video: VideoModel
  handleSearchVideo: (_videoId: string) => void
  isLoading: boolean
}

export default function useVideoViewModel() {
  const { videoId, refetch, isLoading } = useVideoService()
  const [video, setVideo] = useState({} as VideoModel)


  function handleSearchVideo(_videoId: string) {
    videoId.current = _videoId
    refetch().then(it => {
      if (it.data !== undefined) {
        setVideo(it.data)
      }
    })
  }

  return {
    handleSearchVideo,
    video,
    isLoading
  }

}