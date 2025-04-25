/*
  Warnings:

  - The `themePref` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `themePref` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ThemePref" AS ENUM ('LIGHT', 'DARK');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "themePref",
ADD COLUMN     "themePref" "ThemePref" NOT NULL DEFAULT 'LIGHT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "themePref",
ADD COLUMN     "themePref" "ThemePref" NOT NULL DEFAULT 'LIGHT';
