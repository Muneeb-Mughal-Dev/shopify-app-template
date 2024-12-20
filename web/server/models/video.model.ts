import { Model, ModelObject } from 'objection'

export default class VideoModel extends Model {
    static tableName = 'videos'
    static idColumn = 'id'

    id!: number
    title!: string
    video!: string
}

export type VideoShape = ModelObject<VideoModel>
