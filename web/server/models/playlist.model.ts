import { Model, ModelObject } from 'objection'
import { Interaction, Status, Visibility } from '#enum/enum'
import ShopModel from '#models/shop.model'
import VideoModel from '#models/video.model'
import { Playlist } from '#server/interfaces/playlist.interface'

export default class PlaylistModel extends Model implements Playlist {
    static tableName = 'playlists'
    static idColumn = 'id'

    id!: number
    shop_id?: number
    video_id?: number
    title!: string
    visibility!: Visibility
    status!: Status
    interaction!: Interaction

    static relationMappings = {
        shop: {
            relation: Model.BelongsToOneRelation,
            modelClass: ShopModel,
            join: {
                from: 'playlists.shop_id',
                to: 'shops.id',
            },
        },
        videos: {
            relation: Model.HasManyRelation,
            modelClass: VideoModel,
            join: {
                from: 'playlists.video_id',
                to: 'videos.id',
            },
        },
    }
}
export type PlaylistShape = ModelObject<PlaylistModel>
