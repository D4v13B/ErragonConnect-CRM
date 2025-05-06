import { Cliente } from "../../../infrastructure/db/models/Cliente";

export const updateClienteAction = async (data: Partial<Cliente>) => {
  if (!data.id && !data.numero) {
    throw new Error("Debes proporcionar al menos el id o el número del cliente");
  }

  const cliente = await Cliente.findOne({
    where: data.id ? { id: data.id } : { numero: data.numero },
  });

  if (!cliente) throw new Error("Cliente no encontrado");

  // Aplicar los cambios solo si están definidos
  Object.assign(cliente, data)

  await cliente.save();

  return cliente;
};
