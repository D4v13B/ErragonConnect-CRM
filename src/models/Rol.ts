import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({
   timestamps: true
})
export class Rol extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column(DataType.INTEGER)
   declare id: number

   @Unique
   @Column(DataType.STRING)
   declare nombre: string

   @HasMany(() => Usuario)
   usuarios!: Usuario[]
}