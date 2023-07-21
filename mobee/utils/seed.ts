import prismaClient from "./prisma-client.js";

const deleteDb = async () => {
  await prismaClient.film.deleteMany();
  await prismaClient.review.deleteMany();
  await prismaClient.filmWatchStatus.deleteMany();
  await prismaClient.filmsOnLists.deleteMany();
  await prismaClient.list.deleteMany();
  await prismaClient.user.deleteMany();
};

deleteDb()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Delete all DB tables and records");
    await prismaClient.$disconnect();
  });

const film1 = await prismaClient.film.createMany({
  data: [
    {
      tmdb_id: 667538,
    },
    { tmdb_id: 447365 },
    { tmdb_id: 298618 },
    { tmdb_id: 346698 },
    { tmdb_id: 1076487 },
    { tmdb_id: 385687 },
    { tmdb_id: 455476 },
  ],
});

const user1 = await prismaClient.user.create({
  data: {
    email: "user@example.com",
    username: "myUser",
  },
});
