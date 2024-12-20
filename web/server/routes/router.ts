import { PlaylistRoute, ShopRoute, VideoRoute } from '#routes/app/index'
// import { ExtensionPlaylistRoute, ExtensionShopRoute, ExtensionVideoRoute } from '#routes/extension/index'
import { HeaderRoute, InstalledRoute } from '#routes/post/index'
import { ShopifyRoute, WebhooksRoute } from '#routes/pre/index'

export const preRoutes = [new WebhooksRoute(), new ShopifyRoute()]
export const appRoutes = [new ShopRoute(), new PlaylistRoute(), new VideoRoute()]
// export const extensionRoutes = [new ExtensionShopRoute(), new ExtensionPlaylistRoute(), new ExtensionVideoRoute()]

export const postRoutes = [new HeaderRoute(), new InstalledRoute()]
