import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1682961757704 implements MigrationInterface {
    name = 'Default1682961757704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('debit', 'credit') NOT NULL, \`amount\` int NOT NULL, \`description\` double NOT NULL, \`subcategory_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subcategories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_2355c28b92b1bbbfe7f8d5b32b9\` FOREIGN KEY (\`subcategory_id\`) REFERENCES \`subcategories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subcategories\` ADD CONSTRAINT \`FK_f7b015bc580ae5179ba5a4f42ec\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subcategories\` DROP FOREIGN KEY \`FK_f7b015bc580ae5179ba5a4f42ec\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_2355c28b92b1bbbfe7f8d5b32b9\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`subcategories\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
    }

}
