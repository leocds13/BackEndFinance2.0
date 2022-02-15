-- DropForeignKey
ALTER TABLE "Blacklisttokens" DROP CONSTRAINT "Blacklisttokens_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Blacklisttokens" ADD CONSTRAINT "Blacklisttokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
