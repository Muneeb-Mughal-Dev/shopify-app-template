import { Interaction, Status, Visibility } from '#enum/enum'

export interface Video {
    title: string
    video: string
}
export interface Shop {
    shop: string
    brandName: string
}

export interface Playlist {
    id?: number
    shop_id?: number
    video_id?: number
    title: string
    visibility: Visibility
    status: Status
    interaction: Interaction
    video?: Video
    shop?: Shop
}
