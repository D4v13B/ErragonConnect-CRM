import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { Col } from "sequelize/types/utils"
import { FunctionCall } from "./FunctionCall"

@Table
export class FunctionCallProp extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column(DataType.STRING(15))
  prop!: string

  @Column(DataType.STRING(30))
  type!: string

  @Column(DataType.TEXT)
  descripcion!: string

  @Column(DataType.BOOLEAN)
  requerido!: string

  @ForeignKey(() => FunctionCall)
  @Column(DataType.INTEGER)
  functionCallId!: string

  @BelongsTo(() => FunctionCall)
  functionCall?: FunctionCall
}
