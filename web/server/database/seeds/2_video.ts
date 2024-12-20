import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('videos').del()

    await knex('videos').insert([
        {
            id: 1,
            title: 'Video 1',
            video: 'https://example.com/video1.mp4',
        },
        {
            id: 2,
            title: 'Video 2',
            video: 'https://example.com/video2.mp4',
        },
        {
            id: 3,
            title: 'Video 3',
            video: 'https://example.com/video3.mp4',
        },
    ])
}
