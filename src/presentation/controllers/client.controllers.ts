import { Request, Response } from "express"
import { updateClienteAction } from "../../application/actions/cliente/updateCliente.action"

export const updateClient = async (req: Request, res: Response) => {
  try {
    const clienteActualizado = await updateClienteAction(req.body)
    res.json({msg: "Actualizado", clienteActualizado})
  } catch (error) {
    res.status(400).json({ msg: "No se ha logrado actualizar el Cliente" })
  }
}
