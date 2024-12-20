import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { Env } from '#configs/env'
import { dbConnection } from '#database/index'
import { appRoutes, postRoutes, preRoutes } from '#routes/router'
import { ErrorMiddleware } from '#middlewares/error.middleware'
import { Routes } from '#interfaces/routes.interface'
import { logger, stream } from '#utils/logger'
import { getUniquePort } from '#utils/shared/functions'


import apiDocs from '#docs/swagger.json' with { type: 'json' };

const app = express()
;(async () => {
      /*** 
     * Ensure to add proxy rules in `web/frontend/vite.config.js` 
     * for routes outside the `/api` path to handle them correctly in the frontend. 
     ***/

    // Body parsing middleware for handling JSON requests
    app.use(express.json());

    // HTTP request logging middleware (combined format logs detailed request and response info)
    app.use(morgan('combined', { stream }));

    // API documentation route using Swagger UI
    if (Env.NODE_ENV==='development') {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
    }

    // Middleware for handling large payloads and preserving raw body
    app.use(
        express.json({
            limit: '50mb',
            verify: (req: any, res, buf) => {
                req.rawBody = buf;
            },
        }),
    );
    
    /**
     * Centralized error-handling middleware initializer.
     * Ensures that all errors are captured and sent in a structured format.
     */

    const initializeErrorHandling = async () => {
        app.use(ErrorMiddleware)
    }

      /**
     * Initializes and mounts routes to the application.
     * - If `path` is undefined, standard API and extension routes are mounted.
     * - If `path` is `/extension`, mounts all extension routes under the `/extension` path.
     */

    const initializeRoutes = async ({ path, routes }: { path?: '/extension'; routes: Routes[] }) => {
        const extensionRoutes = routes.flatMap((route) => {
            const getPaths: number[] = []
            const getRoutes: Routes[] = []

            route.router.stack.forEach((stack: any, i) => {
                if (stack.route && stack.route.methods && stack.route.methods.get) {
                    // const path = stack.route.path
                    getPaths.push(i)
                }
            })

            getPaths.forEach((i) => {
                if (route.router.stack[i]) {
                    getRoutes.push(route)
                }
            })

            return getRoutes
        })

        if (!path) {
            routes.forEach((route) => {
                app.use('/api', route.router)
            })
            extensionRoutes.forEach((route) => {
                app.use('/extension', route.router)
            })
        } else if (path === '/extension') {
            routes.forEach((route) => {
                app.use(path, route.router)
            })
        }
    }

       /**
     * Initializes Shopify-specific routes.
     * Throws an error if no routes are provided.
     */
    
       const initializeShopifyRoutes = async ({ routes }: { routes: Routes[] }) => {
        if (routes.length === 0) throw new Error('Shopify routes not provided')
        routes.forEach((route) => {
            app.use('/', route.router)
        })
    }

    /******** ROUTES-START ********/

     /** Shopify pre-routes initialization **/
    await initializeShopifyRoutes({ routes: preRoutes });

    /** Main application routes **/
    await initializeRoutes({ routes: appRoutes });

    /** Shopify post-routes initialization **/
    await initializeShopifyRoutes({ routes: postRoutes });

    /******** ROUTES INITIALIZATION ********/

    // Initialize the database connection

    await dbConnection().then(() => {
        logger.info(`╭──────────────────────────────────────────────╮`)
        logger.info(`|                                              |`)
        logger.info(`|             Database Initialized             |`)
        logger.info(`|                                              |`)
        logger.info(`|──────────────────────────────────────────────|`)
    })
    if (Env.NODE_ENV === 'production') {
        app.listen(Env.PORT, async () => {
            logger.info(`|                                              |`)
            logger.info(`|         PRODUCTION IS UP AND RUNNING         |`)
            logger.info(`|                                              |`)
            logger.info(`|                  PORT IS ${Env.PORT}                |`)
            logger.info(`|                                              |`)
            logger.info(`╰──────────────────────────────────────────────╯`)
        })
    } else {
        app.listen(await getUniquePort(), async () => {
            logger.info(`|                                              |`)
            logger.info(`|         DEVELOPMENT IS UP AND RUNNING        |`)
            logger.info(`|                                              |`)
            logger.info(`|               ENV PORT IS ${Env.APP_PORT}              |`)
            logger.info(`|                                              |`)
            logger.info(`|──────────────────────────────────────────────|`)
            logger.info(`|                                              |`)
            logger.info(`|      SWAGGER: http://localhost:${Env.APP_PORT}/docs    |`)
            logger.info(`|                                              |`)
            logger.info(`╰──────────────────────────────────────────────╯`)
        })
    }

    // Initialize error handling middleware
    await initializeErrorHandling()
})()
