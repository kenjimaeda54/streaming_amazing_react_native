import { ThumbnailsModel } from "./ThumbnailsModel";


export interface SubscriptionModel {
  items: ItensSubscription[]
}


export interface ItensSubscription {
  snippet: SnippetSubscription
}

export interface SnippetSubscription {
  title: string
  thumbnails: ThumbnailsModel
  resourceId: {
    channelId: string
  }
}


