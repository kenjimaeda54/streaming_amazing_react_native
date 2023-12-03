import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "./api";
import { Constants } from "@/utility/Contants";
import { SearchVideoModel } from "@/models/SearchVideoModel";
import { MutableRefObject, useRef } from "react";


interface IUseSearchVideo {
  isLoading: boolean,
  data: SearchVideoModel,
  isSuccess: boolean

}

async function searchVideo() {
  const response = await api.get(`/search?part=snippet&relevanceLanguage=pt&maxResults=10&regionCode=BR&key=AIzaSyC6pfq4kSrvQk1eJ55K6cr_89a2z5HbCPo`, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return response.data
}


export default function useSearchVideoService(): IUseSearchVideo {



  const { data = {} as SearchVideoModel, isLoading, isSuccess } = useQuery({
    queryKey: [Constants.searchMovie],
    queryFn: () => searchVideo(),
  })




  return {
    data,
    isLoading,
    isSuccess
  }


}