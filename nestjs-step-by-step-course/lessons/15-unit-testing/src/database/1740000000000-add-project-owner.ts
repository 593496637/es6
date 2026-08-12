import {
  TableColumn,
  TableForeignKey,
  TableIndex,
  type MigrationInterface,
  type QueryRunner,
} from 'typeorm';

export class AddProjectOwner1740000000000 implements MigrationInterface {
  name = 'AddProjectOwner1740000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'projects',
      new TableColumn({ name: 'ownerId', type: 'varchar', isNullable: true }),
    );
    await queryRunner.createIndex(
      'projects',
      new TableIndex({
        name: 'IDX_projects_ownerId',
        columnNames: ['ownerId'],
      }),
    );
    await queryRunner.createForeignKey(
      'projects',
      new TableForeignKey({
        name: 'FK_projects_owner',
        columnNames: ['ownerId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('projects', 'FK_projects_owner');
    await queryRunner.dropIndex('projects', 'IDX_projects_ownerId');
    await queryRunner.dropColumn('projects', 'ownerId');
  }
}
