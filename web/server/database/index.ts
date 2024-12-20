import Knex from 'knex'
import { Model } from 'objection'
import { devConfig, prodConfig } from '#configs/dbConfig'
import { Env } from '#configs/env'

export const dbConnection = async () => {
    Model.knex(Knex(Env.NODE_ENV === 'production' ? prodConfig : devConfig))
}
