import { idArg, queryType, stringArg, floatArg, filter} from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('Cassette', {
      type: 'Cassette',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.cassette.findOne({
          where: {
            id,
          },
        })
      }
    })

    t.list.field('Cassettes', {
      type: 'Cassette',
      args: {
        searchString: stringArg({ nullable: true}),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.cassette.findMany({
          where: {
            OR: [
              { title: { contains: searchString }},
              { genre: { contains: searchString }}
            ],
          },
        })
      }
    })

    t.list.field('discountCassettes', {
      type: 'Cassette',
      args: {
        sale: floatArg({ nullable: true}),
      },
      resolve: (parent, { sale }, ctx) => {
        return ctx.prisma.cassette.findMany({
          where: {
            OR: [
              { price: { price_lte: sale}}
            ],
        }
        })
      }
    })

  }
})