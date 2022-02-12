/*
  Warnings:

  - You are about to drop the `BlackListTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlackListTokens" DROP CONSTRAINT "BlackListTokens_user_id_fkey";

-- DropTable
DROP TABLE "BlackListTokens";

-- CreateTable
CREATE TABLE "Blacklisttokens" (
    "token" VARCHAR(200) NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,

    CONSTRAINT "Blacklisttokens_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "Blacklisttokens" ADD CONSTRAINT "Blacklisttokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
