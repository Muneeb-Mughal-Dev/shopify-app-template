import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('videos', (table) => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('video').notNullable()

        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('videos')
}
