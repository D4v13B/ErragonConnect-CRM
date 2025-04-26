import { Prompt } from "../../../infrastructure/db/models/Prompt"

export const getPrompData = async () => {
  try {
    const prompt = await Prompt.findOne({
      where: {
        isActive: true,
      },
    })

    return prompt?.prompt
  } catch (error) {
    console.error(error)
  }
}
