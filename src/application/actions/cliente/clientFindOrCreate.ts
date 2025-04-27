import { Cliente } from "../../../infrastructure/db/models/Cliente"

export interface ICliente {
  id?: number
  nombre: string
  numero: string
  botActivo?: boolean
}

/**
 * Busca o crea un cliente en la base de datos.
 * 
 * @param {ICliente} param - Datos del cliente.
 * @param {Nombre} param.nombre - Nombre del cliente.
 * @param {Numero} param.numero - Numero de celular del cliente.
 * @returns {Promise<Cliente | boolean>} Cliente encontrado/creado o `false` en caso de error.
 */
export const clientFindOrCreate = async ({
  nombre,
  numero,
}: ICliente): Promise<Cliente | boolean> => {
  try {
    const [cliente, created] = await Cliente.findOrCreate({
      where: { numero },
      defaults: { nombre, numero },
    })

    return cliente
  } catch (error) {
    console.error(error)
    return false
  }
}