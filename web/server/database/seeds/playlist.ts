import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('playlists').del()

    await knex('playlists').insert([
        { shop_id: 1, video_id: 1, status: 'active', title: 'Playlist 1', visibility: 'public', interaction: 'home-page' },
        {
            shop_id: 1,
            video_id: 1,
            status: 'active',
            title: 'Playlist 2',
            visibility: 'private',
            interaction: 'product-card',
        },
    ])
}
