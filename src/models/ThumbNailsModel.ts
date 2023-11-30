export interface ThumbnailsModel {
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