import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740916858095 implements MigrationInterface {
  name = 'Migration1740916858095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" character varying NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_3d97c727c9f600ceff4ab57cd6d" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_3d97c727c9f600ceff4ab57cd6d"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
