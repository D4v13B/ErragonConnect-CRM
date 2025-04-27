import { Request, Response } from "express"
import { getUsersAction } from "../../application/actions/usuarios/getUsers.action"
import { saveUserAction } from "../../application/actions/usuarios/saveUser.action"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const usuarios = await getUsersAction()

    if (!usuarios) {
      res.json({ msg: "No he han encontrado usuarios registrados" })
    }

    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ err: "Error del server al buscar los usuarios" })
  }
}

export const saveUser = async (req: Request, res: Response) => {
  const { nombre, email, password, verificado, rolId, usuario } = req.body

  try {
    const savedUser = await saveUserAction({
      nombre,
      usuario,
      email,
      password,
      verificado,
      rolId,
    })

    if (!savedUser) {
      res
        .status(400)
        .json({
          err: "No se ha logrado guardar el usuario, ya existe o hay un error en el servidor",
        })
    }

    res.json(savedUser)
  } catch (error) {
    res
      .status(500)
      .json({ err: "Error del servidor al momento de guardar los usuarios" })
  }
}
