import { ThumbnailsModel } from "./ThumbNailsModel"


export interface ChannelModel {
  etag: string
  id: string
  snippet: Snippet
}

export interface Snippet {
  title: string
  description: string
  customUrl: string
  publishedAt: string
  thumbnails: ThumbnailsModel
}
