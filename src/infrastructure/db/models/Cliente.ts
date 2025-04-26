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

@Table({
  timestamps: true,
})
export class Cliente extends Model {
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

  @HasMany(() => Mensaje)
  mensajes?: Mensaje[]
}
