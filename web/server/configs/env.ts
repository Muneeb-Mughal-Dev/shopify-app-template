import dotenv from 'dotenv'

dotenv.config()

export const Env = Object.freeze({
    /********** PORTS **********/
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    HOSTNAME: process.env.HOSTNAME,
    /********** DATABASE **********/
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    /********** SHOPIFY **********/
    APP_PORT: process.env.APP_PORT,
    BACKEND_PORT: process.env.BACKEND_PORT,
    SCOPES: process.env.SCOPES?.split(','),
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    /********** LOGS **********/
    LOG_DIR: process.env.LOG_DIR,
})
