import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758124375171 implements MigrationInterface {
    name = 'Init1758124375171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."feed_templates_status_enum" AS ENUM('AVAILABLE', 'UNAVAILABLE')`);
        await queryRunner.query(`CREATE TABLE "feed_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "status" "public"."feed_templates_status_enum" NOT NULL DEFAULT 'UNAVAILABLE', "internal_title" character varying, "internal_description" character varying, CONSTRAINT "PK_06497bba9d2b00feb82af91d7d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feed_templates_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "template_id" uuid NOT NULL, "category_id" uuid NOT NULL, "order" integer, CONSTRAINT "PK_5b355733820862ee56d902296ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feed_resources_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "resource_id" uuid NOT NULL, "category_id" uuid NOT NULL, "order" integer, CONSTRAINT "PK_204a3ca8a0bb98b09f1eff5e8f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_602a8ebd9b8375eda1a807b4c6" ON "feed_resources_categories" ("resource_id", "category_id") `);
        await queryRunner.query(`CREATE TABLE "feed_resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "internal_title" character varying, "internal_description" character varying, CONSTRAINT "PK_e68fef34d317e9006ccd98a4c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feed_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "internal_title" character varying, "internal_description" character varying, CONSTRAINT "PK_ec6a34cd564eb42334019b54dab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feed_templates_categories" ADD CONSTRAINT "FK_5e3cd7306abfbc073a6160914eb" FOREIGN KEY ("template_id") REFERENCES "feed_templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feed_templates_categories" ADD CONSTRAINT "FK_5dd8f7488652f1e80facbad7903" FOREIGN KEY ("category_id") REFERENCES "feed_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feed_resources_categories" ADD CONSTRAINT "FK_6b409a38020534fe31bb29c6de6" FOREIGN KEY ("resource_id") REFERENCES "feed_resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feed_resources_categories" ADD CONSTRAINT "FK_86f8e46e6c3b126bff8874dba01" FOREIGN KEY ("category_id") REFERENCES "feed_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feed_resources_categories" DROP CONSTRAINT "FK_86f8e46e6c3b126bff8874dba01"`);
        await queryRunner.query(`ALTER TABLE "feed_resources_categories" DROP CONSTRAINT "FK_6b409a38020534fe31bb29c6de6"`);
        await queryRunner.query(`ALTER TABLE "feed_templates_categories" DROP CONSTRAINT "FK_5dd8f7488652f1e80facbad7903"`);
        await queryRunner.query(`ALTER TABLE "feed_templates_categories" DROP CONSTRAINT "FK_5e3cd7306abfbc073a6160914eb"`);
        await queryRunner.query(`DROP TABLE "feed_categories"`);
        await queryRunner.query(`DROP TABLE "feed_resources"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_602a8ebd9b8375eda1a807b4c6"`);
        await queryRunner.query(`DROP TABLE "feed_resources_categories"`);
        await queryRunner.query(`DROP TABLE "feed_templates_categories"`);
        await queryRunner.query(`DROP TABLE "feed_templates"`);
        await queryRunner.query(`DROP TYPE "public"."feed_templates_status_enum"`);
    }

}
