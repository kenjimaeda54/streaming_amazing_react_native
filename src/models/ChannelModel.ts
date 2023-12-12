import { ThumbnailsModel } from "./ThumbnailsModel"


export interface ChannelModel {
  etag: string
  items: Items[]
}


export interface Items {
  id: string
  snippet: Snippet
  statistics: Statistics
}
export interface Snippet {
  title: string
  description: string
  customUrl: string
  publishedAt: string
  thumbnails: ThumbnailsModel
}

interface Statistics {
  subscriberCount: string
}
