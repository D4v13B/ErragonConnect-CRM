import { Prompt } from "../../../infrastructure/db/models/Prompt"

export const savePromptAction = async (prompt: string): Promise<boolean> => {
  try {
    const [filasActualizadas] = await Prompt.update(
      { prompt },
      {
        where: { id: 1 },
      }
    )

    return true
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error al momento de guardar en la base de datos"
    )
  }

  return false
}
