import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Prompt extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @Column(DataType.TEXT)
  prompt!: string

  @Column(DataType.BOOLEAN)
  isActive!: boolean
}