import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameNickname1641830312617 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'nickname', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'username', 'nickname');
  }

}
