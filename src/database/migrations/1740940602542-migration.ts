import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740940602542 implements MigrationInterface {
  name = 'Migration1740940602542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscription" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "follower_user_id" uuid, "following_user_id" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_97f653c45e9487f6c57bbddfe20" FOREIGN KEY ("follower_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_0a6f45f670341ffc82228a5b618" FOREIGN KEY ("following_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_0a6f45f670341ffc82228a5b618"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_97f653c45e9487f6c57bbddfe20"`,
    );
    await queryRunner.query(`DROP TABLE "subscription"`);
  }
}
