import { DeliveryMethod } from '@shopify/shopify-api'
import { WebhookHandlersParam } from '@shopify/shopify-app-express'
import { logger } from '#utils/logger'

const GDPRWebhookHandlers: WebhookHandlersParam = {
    /**
     * Customers can request their data from a store owner. When this happens,
     * Shopify invokes this privacy webhook.
     *
     * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
     */
    CUSTOMERS_DATA_REQUEST: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/api/webhooks',
        callback: async (topic: any, shop: any, body: string, webhookId: any) => {
            const payload = JSON.parse(body)
            logger.info('topic CUSTOMERS_DATA_REQUEST==>', topic)
            logger.info('shop CUSTOMERS_DATA_REQUEST==>', shop)
            logger.info('payload CUSTOMERS_DATA_REQUEST==>', payload)
            logger.info('webhookId CUSTOMERS_DATA_REQUEST==>', webhookId)
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com",
            //   "orders_requested": [
            //     299938,
            //     280263,
            //     220458
            //   ],
            //   "customer": {
            //     "id": 191167,
            //     "email": "john@example.com",
            //     "phone": "555-625-1199"
            //   },
            //   "data_request": {
            //     "id": 9999
            //   }
            // }
        },
    },

    /**
     * Store owners can request that data is deleted on behalf of a customer. When
     * this happens, Shopify invokes this privacy webhook.
     *
     * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
     */
    CUSTOMERS_REDACT: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/api/webhooks',
        callback: async (topic: any, shop: any, body: string, webhookId: any) => {
            const payload = JSON.parse(body)
            logger.info('topic CUSTOMERS_DATA_REQUEST==>', topic)
            logger.info('shop CUSTOMERS_DATA_REQUEST==>', shop)
            logger.info('payload CUSTOMERS_DATA_REQUEST==>', payload)
            logger.info('webhookId CUSTOMERS_DATA_REQUEST==>', webhookId)
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com",
            //   "customer": {
            //     "id": 191167,
            //     "email": "john@example.com",
            //     "phone": "555-625-1199"
            //   },
            //   "orders_to_redact": [
            //     299938,
            //     280263,
            //     220458
            //   ]
            // }
        },
    },

    /**
     * 48 hours after a store owner uninstalls your app, Shopify invokes this
     * privacy webhook.
     *
     * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
     */
    SHOP_REDACT: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: '/api/webhooks',
        callback: async (topic: any, shop: any, body: string, webhookId: any) => {
            const payload = JSON.parse(body)
            logger.info('topic CUSTOMERS_DATA_REQUEST==>', topic)
            logger.info('shop CUSTOMERS_DATA_REQUEST==>', shop)
            logger.info('payload CUSTOMERS_DATA_REQUEST==>', payload)
            logger.info('webhookId CUSTOMERS_DATA_REQUEST==>', webhookId)
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com"
            // }
        },
    },
}

export default GDPRWebhookHandlers
