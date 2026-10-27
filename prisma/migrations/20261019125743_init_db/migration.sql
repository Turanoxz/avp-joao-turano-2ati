-- CreateTable
CREATE TABLE `animes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `temporadas` INTEGER NOT NULL DEFAULT 0,
    `episodios` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'planejo assistir',
    `nota` DOUBLE NULL,
    `sinopse` TEXT NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
