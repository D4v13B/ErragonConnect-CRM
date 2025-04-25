import "dotenv/config"
import { Sequelize } from "sequelize-typescript"
import { STAGE } from "../app"
// import * as models from "./../models"


export const sequelize = new Sequelize({
  host: process.env.DB_HOST as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME as string,
  dialect: "mysql",

  models: [__dirname + "/../models"],
})

export const conectarDB = async () => {
  try {
    if(STAGE == "dev"){
      await sequelize.sync({ alter: false, logging: true })
    }else{
      await sequelize.authenticate({logging: false})
    }
    console.log("🫛  Conectado con base de datos")
  } catch (error) {
    console.log(error)
  }
}
