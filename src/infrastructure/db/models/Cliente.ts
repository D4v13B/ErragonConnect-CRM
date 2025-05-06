import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript"
import { Mensaje } from "./Mensaje"

interface attrCreate {
  nombre: string
  numero: string
}

@Table({
  timestamps: true,
})
export class Cliente extends Model<Cliente, attrCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column(DataType.STRING(30))
  nombre!: string

  // @Unique
  @Index({
    unique: true,
  })
  @Column(DataType.STRING(30))
  numero!: string
  
  @Default(true)
  @Column(DataType.BOOLEAN)
  botActivo!: boolean

  // TODO Crear migracion y seeders
  @Default(1)
  @Column(DataType.INTEGER)
  tag!: number

  @HasMany(() => Mensaje, { foreignKey: "numeroCliente", sourceKey: "numero", as: "mensajes" })
mensajes?: Mensaje[];
}
