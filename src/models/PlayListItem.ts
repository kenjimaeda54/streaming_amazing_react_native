import { ThumbnailsModel } from "./ThumbnailsModel"


export interface PlayListItem {
  items: Array<ItensPlayList>
}

interface ItensPlayList {
  snippet: SnippetPlayList
  id: string
}

interface SnippetPlayList {
  title: string
  description: string,
  publishedAt: string,
  thumbnails: ThumbnailsModel
  channelTitle: string
  resourceId: {
    videoId: string
  }
}