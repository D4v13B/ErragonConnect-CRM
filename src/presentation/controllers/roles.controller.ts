import { Request, Response } from "express";
import { getRolesAction } from "../../application/actions/roles/getRoles.action";

export const getRoles = async(req: Request, res: Response) => {
  try {
    const data = await getRolesAction()

    if(!data) {
      res.json({msg: "No se han encontrado Roles"})
      return
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({msg: "Error en el servidor al momento de buscar los roles"})
  }
}