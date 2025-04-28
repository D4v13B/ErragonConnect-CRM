import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { FunctionCallProp } from "./FunctionCallProp";

@Table
export class FunctionCall extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column(DataType.STRING(30))
  nombre!: string

  @Column(DataType.TEXT)
  descipcion!: string

  @Column(DataType.STRING(80))
  endpoint!: string

  @HasMany(() => FunctionCallProp)
  props?: FunctionCallProp[]
}