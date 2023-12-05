import { ChannelModel } from "@/models/ChannelModel";
import { SearchVideoModel, ItemsSnippet } from "@/models/SearchVideoModel";
import { VideosWithChannelModel } from "@/models/VideosWithChannelModel";
import useVideosWithChannelService from "@/services/useVideosWithChannelServices";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface IUseSearchViewModel {
  channelWithVideo: VideosWithChannelModel[]
  isLoading: boolean
}


export default function useSearchViewModel(): IUseSearchViewModel {
  const { channelWithVideo, isLoading } = useVideosWithChannelService()


  return {
    channelWithVideo,
    isLoading,
  }
}