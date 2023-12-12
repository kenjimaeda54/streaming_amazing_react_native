import { ItemsSnippet, Snippet } from "./SearchVideoModel";

export interface VideoModel {
  items: ItemsVideo[]
}

export interface ItemsVideo {
  snippet: Snippet
  statistics: Statistics
}

interface Statistics {
  viewCount: string
}