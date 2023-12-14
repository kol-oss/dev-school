/*
  Warnings:

  - The values [electronics] on the enum `categories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "categories_new" AS ENUM ('UNKNOWN', 'STUDY', 'SPORT', 'ELECTRONICS');
ALTER TABLE "products" ALTER COLUMN "category" TYPE "categories_new" USING ("category"::text::"categories_new");
ALTER TYPE "categories" RENAME TO "categories_old";
ALTER TYPE "categories_new" RENAME TO "categories";
DROP TYPE "categories_old";
COMMIT;
