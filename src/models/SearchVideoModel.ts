import { ThumbnailsModel } from "./ThumbnailsModel"

export interface SearchVideoModel {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: PageInfoModel,
  items: Array<ItemsSnippet>,

}


export interface PageInfoModel {
  totalResults: number,
  resultsPerPage: number,
}

export interface ItemsSnippet {
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