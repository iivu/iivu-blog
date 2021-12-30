import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreateAtAndUpdateAt1640790806817 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({ name: 'createAt', type: 'timestamp', isNullable: false, default: 'now()' }),
      new TableColumn({ name: 'updateAt', type: 'timestamp', isNullable: false, default: 'now()' }),
    ]);
    await queryRunner.addColumns('posts', [
      new TableColumn({ name: 'createAt', type: 'timestamp', isNullable: false, default: 'now()' }),
      new TableColumn({ name: 'updateAt', type: 'timestamp', isNullable: false, default: 'now()' }),
    ]);
    await queryRunner.addColumns('comments', [
      new TableColumn({ name: 'createAt', type: 'timestamp', isNullable: false, default: 'now()' }),
      new TableColumn({ name: 'updateAt', type: 'timestamp', isNullable: false, default: 'now()' }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [ 'createAt', 'updateAt' ]);
    await queryRunner.dropColumns('posts', [ 'createAt', 'updateAt' ]);
    await queryRunner.dropColumns('comments', [ 'createAt', 'updateAt' ]);
  }

}
