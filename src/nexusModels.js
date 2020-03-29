import { objectType } from 'nexus'

const Cassette = objectType({
  name: 'Cassette',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.price()
    t.model.artist()
    t.model.genre()
  }
})

export const Models = [
  Cassette
]