import "dotenv/config"
import { Content, FunctionCallingConfigMode, GoogleGenAI } from "@google/genai"
import { getPrompData } from "../../application/actions/prompt/getPrompData"
import axios from "axios"
import { getAllFunctionCalls } from "./utils/getAllFunCalls"
import { getMessaageClient } from "../../application/actions/message/getMessageClient"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY, vertexai: false })
const nameModel = "gemini-2.0-flash"

export async function generate(
  message: string,
  clientNumber?: string
): Promise<string> {
  const promptData = (await getPrompData()) ?? ""

  let conversation: Content[] = []

  if (clientNumber) {
    const historialDB = await getMessaageClient(clientNumber)

    conversation =
      historialDB?.map((msg) => ({
        role: msg.fromMe == true ? "model" : "user",
        parts: [{ text: msg.body }],
      })) ?? []
  }

  const functionDeclarations = await getAllFunctionCalls()

  try {
    const hasFunctions =
      Array.isArray(functionDeclarations) && functionDeclarations.length > 0

    const response = await ai.models.generateContent({
      model: nameModel,
      contents: [
        ...conversation,
        {
          role: "user",
          parts: [{ text: promptData }],
        },
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      ...(hasFunctions && {
        config: {
          tools: [{ functionDeclarations }],
          toolConfig: {
            functionCallingConfig: {
              mode: FunctionCallingConfigMode.AUTO,
            },
          },
        },
      }),
    })

    const functionCall = response?.candidates?.[0]?.content?.parts?.find(
      (part) => part.functionCall
    )?.functionCall

    if (functionCall) {
      try {
        // Obtenemos la configuración de la función

        const functionDeclaration = functionDeclarations.find(
          (fn) => fn.name === functionCall.name
        )

        if (!functionDeclaration) {
          console.log(
            `FunctionCall ${functionCall.name} no existe en la base de datos.`
          )
          return response?.text ?? "No se ha logrado responder con el AgenteIA"
        }

        // Llamamos al endpoint con los args
        const responseAPI = await axios.get(
          functionDeclaration.endpoint as string,
          {
            params: functionCall.args,
          }
        )

        // console.log(responseAPI.data)

        const functionResponse = {
          name: functionCall.name,
          response: {
            tool_call_id: functionCall.name,
            output: JSON.stringify(responseAPI.data),
          },
        }

        const responseWithFunctionResult = await ai.models.generateContent({
          model: nameModel,
          contents: [
            { role: "user", parts: [{ text: promptData }] },
            { role: "user", parts: [{ text: message }] },
            {
              role: "model",
              parts: [{ text: JSON.stringify(responseAPI.data) }],
            },
          ],
        })

        return (
          responseWithFunctionResult?.text ??
          "No se pudo generar la respuesta final"
        )
      } catch (error) {
        console.error("Error procesando la functionCall:", error)
        return "Ocurrió un error al intentar ejecutar la función."
      }
    }

    return response?.text ?? "No se ha logrado responder con el AgenteIA"
  } catch (error) {
    return "El agente no está bien configurado. Contactar al proveedor de este servicio"
  }
}
