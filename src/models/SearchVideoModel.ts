import { ThumbnailsModel } from "./ThumbNailsModel"

export interface SearchVideoModel {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: PageInfoModel,
  items: Array<VideoModel>,

}


export interface PageInfoModel {
  totalResults: number,
  resultsPerPage: number,
}

export interface VideoModel {
  kind: string
  etag: string
  id: IdVideoModel
  snippet: Snippet
}

export interface Snippet {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  thumbnails: ThumbnailsModel,
  channelTitle: string,
  liveBroadcastContent: string,

}


export interface IdVideoModel {
  kind: string,
  videoId: string,
}