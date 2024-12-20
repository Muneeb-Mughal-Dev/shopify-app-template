import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('playlists', (table) => {
        table.increments('id').primary()
        table.integer('shop_id').unsigned().references('id').inTable('shops').onDelete('CASCADE')
        table.integer('video_id').unsigned().references('id').inTable('videos').onDelete('CASCADE')
        table.string('title').notNullable()
        table.enu('visibility', ['public', 'private']).defaultTo('public')
        table.enu('status', ['active', 'inactive']).defaultTo('active')
        table.enu('interaction', ['product-card', 'home-page']).defaultTo('home-page')
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('playlists')
}
