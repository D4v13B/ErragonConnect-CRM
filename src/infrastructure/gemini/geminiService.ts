import "dotenv/config"
import {
  FunctionCallingConfigMode,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai"
import { getPrompData } from "../../application/actions/prompt/getPrompData"
import axios from "axios"
import { getAllFunctionCalls } from "./utils/getAllFunCalls"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY, vertexai: false })
const nameModel = "gemini-2.0-flash"

export async function generate(message: string): Promise<string> {
  const promptData = (await getPrompData()) ?? ""

  const functionDeclarations = await getAllFunctionCalls()

  const response = await ai.models.generateContent({
    model: nameModel,
    contents: [
      {
        role: "user",
        parts: [{ text: promptData }],
      },
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
    config: {
      tools: [{ functionDeclarations }],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.AUTO,
          // allowedFunctionNames: functionDeclarations
          // ?.map((e) => e.name) 
          // .filter((name): name is string => !!name),
        },
      },
    },
  })

  const functionCall = response?.candidates?.[0]?.content?.parts?.find(
    (part) => part.functionCall
  )?.functionCall

  if (functionCall) {
    try {
      // Obtenemos la configuración de la función
      
      const functionDeclaration = functionDeclarations.find(fn => fn.name === functionCall.name)
      

      // Extraemos el endpoint desde la base de datos
      // const functionCallDB = await import(
      //   "../../infrastructure/db/models/FunctionCall"
      // ).then((m) =>
      //   m.FunctionCall.findOne({ where: { nombre: functionCall.name } })
      // )

      if (!functionDeclaration) {
        console.log(
          `FunctionCall ${functionCall.name} no existe en la base de datos.`
        )
        return response?.text ?? "No se ha logrado responder con el AgenteIA"
      }

      // Llamamos al endpoint con los args
      const { data: endpointResponse } = await axios.post(
        functionDeclaration.endpoint as string,
        functionCall.args
      )

      const functionResponse = {
        name: functionCall.name,
        response: {
          tool_call_id: functionCall.name,
          output: JSON.stringify(endpointResponse),
        },
      }

      const responseWithFunctionResult: GenerateContentResponse =
        await ai.models.generateContent({
          model: nameModel,
          contents: [
            { role: "user", parts: [{ text: promptData }] },
            { role: "user", parts: [{ text: message }] },
            {
              role: "model",
              parts: [{ text: JSON.stringify(functionResponse) }],
            },
          ],
        })

      return (
        responseWithFunctionResult.text ??
        "No se pudo generar la respuesta final."
      )
    } catch (error) {
      console.error("Error procesando la functionCall:", error)
      return "Ocurrió un error al intentar ejecutar la función."
    }
  }

  return response?.text ?? "No se ha logrado responder con el AgenteIA"
}
