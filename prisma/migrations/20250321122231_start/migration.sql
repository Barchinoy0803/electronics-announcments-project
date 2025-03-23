-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'SUPERADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('PHONE', 'LAPTOP', 'ELECTRONIC', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "CONDITION_TYPE" AS ENUM ('OLD', 'NEW');

-- CreateEnum
CREATE TYPE "PRODUCT_STATUS" AS ENUM ('PENDING', 'ACTIVE', 'FAIL');

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TYPE" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "lastOnline" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'USER',
    "regionId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "TYPE" NOT NULL,
    "condition" "CONDITION_TYPE" NOT NULL,
    "isNegotiable" BOOLEAN NOT NULL,
    "count" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "status" "PRODUCT_STATUS" NOT NULL DEFAULT 'PENDING',
    "colorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Views" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutSite" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "privacy_policy" TEXT NOT NULL,
    "terms_of_service" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "supportPhone" TEXT NOT NULL,
    "telegramLink" TEXT NOT NULL,
    "facebookLink" TEXT NOT NULL,

    CONSTRAINT "AboutSite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
