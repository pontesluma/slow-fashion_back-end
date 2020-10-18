import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createImages1603040764608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'store_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'ImagesStore',
            columnNames: ['store_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stores',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('images');
  }
}
