import { ShopRoute, TestRoute } from '#routes/app/index'
import { HeaderRoute, InstalledRoute } from '#routes/post/index'
import { ShopifyRoute, WebhooksRoute } from '#routes/pre/index'

export const appRoutes = [new ShopRoute(), new TestRoute()]
export const preRoutes = [new WebhooksRoute(), new ShopifyRoute()]
export const postRoutes = [new HeaderRoute(), new InstalledRoute()]
