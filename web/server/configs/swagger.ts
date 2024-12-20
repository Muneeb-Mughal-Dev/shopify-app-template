import swaggerAutogen from 'swagger-autogen'
import { apiInfo, apiOptions } from '#configs/apiInfo'
import { Env } from '#configs/env'
import { pagination } from '#configs/pagination'
import { modules, outputFile } from '#utils/dir'

const doc = {
    info: apiInfo,
    host: `http://localhost:${Env.NODE_ENV === 'development' ? Number(Env.APP_PORT) : Number(Env.PORT)}`,
    components: pagination,
}

swaggerAutogen(apiOptions)(outputFile, modules, doc)
