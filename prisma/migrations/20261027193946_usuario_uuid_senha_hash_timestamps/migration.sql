-- Convert IDs to UUIDs and preserve existing bcrypt password hashes.
ALTER TABLE `usuarios`
    ADD COLUMN `id_uuid` VARCHAR(36) NULL,
    ADD COLUMN `senhaHash` VARCHAR(255) NULL,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NULL;

UPDATE `usuarios`
SET `id_uuid` = UUID(),
    `senhaHash` = `senha`,
    `updated` = `created`;

ALTER TABLE `usuarios`
    DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `senha`,
    CHANGE COLUMN `id_uuid` `id` VARCHAR(36) NOT NULL,
    MODIFY COLUMN `senhaHash` VARCHAR(255) NOT NULL,
    MODIFY COLUMN `updated` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);
