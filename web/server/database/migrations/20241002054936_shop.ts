import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('shops', (table) => {
        table.increments('id').primary()
        table.string('shop').notNullable()
        table.string('brandName').notNullable()
        table.timestamps(true, true)
    })
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('shops')
}
