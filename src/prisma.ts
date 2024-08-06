import pr from "@prisma/client";
const { Prisma, PrismaClient } = pr;

let prisma = new PrismaClient();

export default prisma;
