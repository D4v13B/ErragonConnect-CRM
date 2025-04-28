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
import { Usuario } from "./Usuario"

interface CreationAttribute {
  body: string
  //   fromNumber: string
  numeroCliente: string
  fromMe: boolean
  usuaId: number
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
  @Column(DataType.STRING(30))
  numeroCliente!: string

  @ForeignKey(() => Usuario)
  @Column(DataType.INTEGER)
  usuaId!: number

  // @Column(DataType.TEXT)
  // toNumber!: string

  @Column(DataType.BOOLEAN)
  fromMe!: boolean

  @BelongsTo(() => Cliente, {
    foreignKey: "numeroCliente",
    targetKey: "numero",
  })
  cliente?: Cliente

  @BelongsTo(() => Usuario)
  usuario?: Usuario
}
