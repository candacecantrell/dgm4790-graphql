import { PrismaClient } from '@prisma/client'
import fs from 'fs'
require('dotenv').config({ path: '.env' })

const prismaClient = new PrismaClient()

const cassette_list = fs.readFileSync('prisma/example_files/cassettes.json')

function loadCassettes() {
  const cassetteList = JSON.parse(cassette_list)
  const allCassettes = cassetteList.cassette
  return allCassettes.map(list => {
    return {
      data: {
        title: list.title.text,
        artist: list.artist.text,
        price: list.price.text,
        genre: list.genre.text,
      },
    }
  })
}

/* async function createCourse() {
  try {
    await prismaClient.course.create({
      data: {
        name: 'Rich Internet Applications II',
        description:
          'Most useful DGM course ever created.  Taught by the most brilliant yet humble professor to ever grace the hallways of UVU.',
        defaultCredits: '3',
        courseCode: 'DGM 4790',
        termsOffered: 'Spring',
      },
    })
  } catch (err) {
    console.log(err)
  }
} */

async function main() {
  try {
    const allCassettes = loadCassettes()
    for (let list of allCassettes) {
      await prismaClient.cassette.create(list)
      .catch(err => console.log(`Error trying to create UVU courses: ${err} course ${list}`))
    }
  } catch (err) {
    console.log(err)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.disconnect()
  })
