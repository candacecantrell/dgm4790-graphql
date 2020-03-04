import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

async function createCourse() {
  try {
    await prismaClient.course.create({
      data: {
        name: 'Rich Internet Applications II',
        description: 'Most useful DGM course ever created.  Taught by the most brilliant yet humble professor to ever grace the hallways of UVU.',
        defaultCredits: '3',
        courseCode: 'DGM 4790',
        termsOffered: 'Spring'
      },
    })
  } catch (err) {
    console.log(err)
  }
}

async function main() {
  try {
    await createCourse()
  } catch(err) {
    console.log(err)
  }
}

main()
.catch(e => console.error(e))
.finally(async () => {
  await prismaClient.disconnect()
})