import { Request, Response } from "express"
import { getPrompData } from "../../application/actions/prompt/getPrompData"
import { savePromptAction } from "../../application/actions/prompt/savePrompt.action"

export const getPrompt = async (req: Request, res: Response) => {
  try {
    const prompt = await getPrompData()

    res.json({ prompt })

    return
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hay un error en el servidor al buscar el prompt" })
  }
}

export const savePrompt = async (req: Request, res: Response) => {
  const { prompt } = req.body

  try {
    const isUpdatePrompt = await savePromptAction(prompt)

    res.json({ msg: "Actualizado correctamente" })
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hay un error en el servidor al buscar el prompt" })
  }
}
