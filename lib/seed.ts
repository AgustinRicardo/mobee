import prismaClient from "./prisma-client.js";

const deleteDb = async () => {
  await prismaClient.review.deleteMany();
  await prismaClient.filmWatchStatus.deleteMany();
  await prismaClient.filmsOnLists.deleteMany();
  await prismaClient.film.deleteMany();
  await prismaClient.list.deleteMany();
  await prismaClient.user.deleteMany();
};

await deleteDb()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Delete all DB tables and records");
    await prismaClient.$disconnect();
  });

const user1 = await prismaClient.user.create({
  data: {
    email: "user@example.com",
    username: "myUser",
  },
});

const films = await prismaClient.film.createMany({
  data: [
    { tmdb_id: 1076487 },
    { tmdb_id: 385687 },
    { tmdb_id: 455476 },
  ],
});

const film1 = await prismaClient.film.create({
  data: { tmdb_id: 667538 },
});

const film2 = await prismaClient.film.create({
  data: { tmdb_id: 447365 },
});

const list1 = await prismaClient.list.create({
  data: {
    title: "Pelis verano",
    user_id: user1.id,
    bookmark_count: 5,
  },
});

const film3 = await prismaClient.film.create({
  data: { tmdb_id: 298618 },
});

const film4 = await prismaClient.film.create({
  data: { tmdb_id: 346698 },
});

const list2 = await prismaClient.list.create({
  data: {
    title: "Próximas pelis",
    user_id: user1.id,
    bookmark_count: 6,
  },
});

await prismaClient.filmsOnLists.createMany({
  data: [
    { film_id: film1.id, list_id: list1.id },
    { film_id: film2.id, list_id: list1.id },
    { film_id: film3.id, list_id: list2.id },
    { film_id: film4.id, list_id: list2.id },
  ],
});
