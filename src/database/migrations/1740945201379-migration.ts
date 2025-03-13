import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740945201379 implements MigrationInterface {
    name = 'Migration1740945201379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isBlocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBlocked"`);
    }

}
