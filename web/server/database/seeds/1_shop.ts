import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('shops').del()

    await knex('shops').insert([
        { id: 1, shop: 'Shop 1', brandName: 'bonaanza' },
        { id: 2, shop: 'Shop 2', brandName: 'nike' },
    ])
}
