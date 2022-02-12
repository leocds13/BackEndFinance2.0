-- CreateTable
CREATE TABLE "BlackListTokens" (
    "token" VARCHAR(200) NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,

    CONSTRAINT "BlackListTokens_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "BlackListTokens" ADD CONSTRAINT "BlackListTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
