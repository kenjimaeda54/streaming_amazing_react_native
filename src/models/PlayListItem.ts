import { ThumbnailsModel } from "./ThumbnailsModel"


export interface PlayListItem {
  items: Array<ItensPlayList>
}

interface ItensPlayList {
  snippet: SnippetPlayList
}

interface SnippetPlayList {
  title: String
  description: String
  thumbnails: ThumbnailsModel
  channelTitle: String
  resourceId: {
    videoId: string
  }
}