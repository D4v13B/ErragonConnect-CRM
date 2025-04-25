import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript"
import { Cliente } from "./Cliente"

interface CreationAttribute {
  body: string
  //   fromNumber: string
  clientNumber: string
  fromMe: boolean
}

@Table({
  timestamps: true,
})
export class Mensaje extends Model<Mensaje, CreationAttribute> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column(DataType.TEXT)
  body!: string

  // @Column(DataType.TEXT)
  // fromNumber!: string

  @ForeignKey(() => Cliente)
  // @Column(DataType.STRING(30))
  numeroCliente!: number

  @Column(DataType.TEXT)
  toNumber!: string

  @Column(DataType.BOOLEAN)
  fromMe!: boolean

  @BelongsTo(() => Cliente, {
    foreignKey: "clientNumber",
    targetKey: "numero",
  })
  client?: Cliente
}
