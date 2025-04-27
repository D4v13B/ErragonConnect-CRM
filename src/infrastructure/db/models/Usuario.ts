import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  IsEmail,
  Unique,
  AllowNull,
  Default,
  ForeignKey,
  HasMany,
  BelongsTo,
  BeforeCreate,
} from "sequelize-typescript"
import { Rol } from "./Rol"
import { Mensaje } from "./Mensaje"
// import { Sucursal } from "./Sucursal"
// import { Factura } from "./Factura"
// import { saltAndHashPassword } from "../../helpers/hashPassword"

@Table({
  timestamps: true,
})
export class Usuario extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number

  @Column(DataType.STRING(20))
  declare nombre: string

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(15))
  usuario!: string

  @IsEmail
  @Unique
  @Column(DataType.STRING(30))
  declare email: string

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string

  @AllowNull(true)
  @Column(DataType.STRING)
  telefono!: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  verificado!: boolean

  @Column(DataType.STRING)
  token!: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  isOnline!: boolean

  // @ForeignKey(() => Sucursal)
  // @Column(DataType.INTEGER)
  // sucuId!: number

  @ForeignKey(() => Rol) //Tiene un rol
  @Column(DataType.INTEGER)
  rolId!: number

  @BelongsTo(() => Rol, {onDelete: "CASCADE"})
  rol!: Rol

  @HasMany(() => Mensaje)
  mensajes?: Mensaje

  // @BelongsTo(() => Sucursal)
  // sucursal!: Sucursal

  // @HasMany(() => Factura, "usuaId")
  // facturasVenta!: Factura[]

  // @HasMany(() => Factura, "clienteId")
  // facturasCliente!: Factura[]

  // @BeforeCreate
  // static hashPassword(user: User) {
  //   if (user.password) {
  //     user.password = saltAndHashPassword(user.password)
  //   }
  // }
}
