import { idArg, queryType, stringArg, floatArg, filter, intArg} from 'nexus'

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

    t.list.field('searchCassettes', {
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

    // t.list.field('Cassettes', {
    //   type: 'Cassette',
    //   // args: {
    //   //   sale: floatArg({ nullable: true}),
    //   // },
    //   resolve: (parent, ctx) => {
    //     return ctx.prisma.cassette.findMany({
    //       where: {
    //           price: { _lte: 10.00 }
    //       // filter: { price: {$lte: sale}
    //     },
    //     })
    //   }
    // })
    t.list.field( 'priceCassettes', {
      type: 'Cassette',
      args: {
        priceHigh: floatArg({ nullable: true}),
      },
      resolve: (parent, { priceHigh }, ctx) => {
        return ctx.prisma.cassette.findMany({
          where: {
            OR: [
              { price: {lt: priceHigh}}
            ],
          },
        })
      }
    })

  } 
})