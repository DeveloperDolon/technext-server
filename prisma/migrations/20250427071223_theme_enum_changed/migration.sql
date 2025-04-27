/*
  Warnings:

  - The values [LIGHT,DARK] on the enum `ThemePref` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ThemePref_new" AS ENUM ('light', 'dark');
ALTER TABLE "Client" ALTER COLUMN "themePref" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "themePref" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "themePref" TYPE "ThemePref_new" USING ("themePref"::text::"ThemePref_new");
ALTER TABLE "Client" ALTER COLUMN "themePref" TYPE "ThemePref_new" USING ("themePref"::text::"ThemePref_new");
ALTER TYPE "ThemePref" RENAME TO "ThemePref_old";
ALTER TYPE "ThemePref_new" RENAME TO "ThemePref";
DROP TYPE "ThemePref_old";
ALTER TABLE "Client" ALTER COLUMN "themePref" SET DEFAULT 'light';
ALTER TABLE "User" ALTER COLUMN "themePref" SET DEFAULT 'light';
COMMIT;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "themePref" SET DEFAULT 'light';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "themePref" SET DEFAULT 'light';
