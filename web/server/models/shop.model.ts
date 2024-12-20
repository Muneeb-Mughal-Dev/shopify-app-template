import { Model, ModelObject } from 'objection'
import { Shop } from '#server/interfaces/shops.interface'

export default class ShopModel extends Model implements Shop {
    static tableName = 'shops'
    static idColumn = 'id'
    id!: number
    shop!: string
    brandName!: string
}
export type ShopShape = ModelObject<ShopModel>
