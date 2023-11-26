
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
  thumbnails: Thumbnails,
  channelTitle: string,
  liveBroadcastContent: string,

}

export interface Thumbnails {
  default: ThumbnailsDetails,
  medium: ThumbnailsDetails,
  high: ThumbnailsDetails,
  standard: ThumbnailsDetails,
}

export interface ThumbnailsDetails {
  url: string
  width: number,
  height: number
}

export interface IdVideoModel {
  kind: string,
  videoId: string,
}