import prisma from "./prisma.js";
import bcrypt from "bcrypt";

const password = await bcrypt.hash("skenoADMIN009!", 10);

await prisma.user.create({
  data: {
    name: "admin",
    username: "admin",
    email: "deshonmorgan1317@gmail.com",
    password: {
      create: {
        hash: password,
      },
    },
    roles: ["ADMIN"],
  },
});

// async function seed() {
//   await prisma.comment.deleteMany();
//   await prisma.quote.deleteMany();
//   await prisma.tag.deleteMany();
//   await prisma.user.deleteMany();
//   await prisma.author.deleteMany();

//   // ADMIN
//   const password = await bcrypt.hash("AdMiN369!", 10);

//   await prisma.user.create({
//     data: {
//       name: "Administrator",
//       username: "admin",
//       email: "admin@email.com",
//       password: {
//         create: { hash: password },
//       },
//       roles: ["ADMIN"],
//     },
//   });
//   console.log("Database has been seeded. 🌱");
// }

// seed()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
