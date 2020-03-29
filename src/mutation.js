import { idArg, mutationType, stringArg } from 'nexus'

export const Mutation = mutationType({
    name: 'Mutation',
    definition(t) {

        t.crud.deleteOneCassette()
        
        t.field('createCassette', {
            type: 'Cassette',
            args: {
                title: stringArg({ nullable: false }),
                price: stringArg(),
                artist: stringArg(),
                genre: stringArg({ nullable: false }),
            },
            resolve: (parent, { title, price, artist, genre }, ctx) => {
                return ctx.prisma.cassette.create({
                    data: {
                        title,
                        price,
                        artist,
                        genre
                    }
                })
            }
        })

        t.field('updateCassette', {
            type: 'Cassette',
            args: { id: idArg(),
                title: stringArg(),
                price: stringArg(),
                artist: stringArg(),
                genre: stringArg(),
            },
            resolve: (parent, { title, price, artist, genre }, ctx) => {
                return ctx.prisma.cassette.update({
                    where: {
                        id
                    },
                    data: {
                        title,
                        price,
                        artist,
                        genre
                    }
                })
            }
        })
    }
})