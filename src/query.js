import { idArg, queryType, stringArg } from 'nexus'

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

  }
})