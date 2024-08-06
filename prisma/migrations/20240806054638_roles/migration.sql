-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Roles"[];
