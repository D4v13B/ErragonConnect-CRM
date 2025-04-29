import "dotenv/config"
import {
  FunctionCallingConfigMode,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai"
import { getPrompData } from "../../application/actions/prompt/getPrompData"
import axios from "axios"
import { getAllFunctionCalls } from "./utils/getAllFunCalls"
import qs from "qs"
import { text } from "stream/consumers"

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

      const functionDeclaration = functionDeclarations.find(
        (fn) => fn.name === functionCall.name
      )

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

      // Verificar si functionCall.args está definido y es un objeto
      // let args: Record<string, string> = {}

      // if (functionCall.args && typeof functionCall.args === "object") {
      //   try {
      //     // Convertimos el objeto a Record<string, string> asegurándonos de que todos los valores sean cadenas
      //     args = Object.fromEntries(
      //       Object.entries(functionCall.args).map(([k, v]) => [k, String(v)])
      //     )
      //   } catch (error) {
      //     console.error("Error al manejar los argumentos:", error)
      //   }
      // }

      // Usamos qs.stringify para convertir el objeto args en formato x-www-form-urlencoded
      // const data = qs.stringify(args)

      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: functionDeclaration.endpoint as string,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   data: data,
      // }

      // const responseAPI = await axios.post(
      //   functionDeclaration.endpoint as string,
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //     data,
      //   }
      // )

      // const responseAPI = await axios.request(config)
      
      // Llamamos al endpoint con los args
      const responseAPI = await axios.get(
        functionDeclaration.endpoint as string,{
          params: functionCall.args
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
        ]
      })

      // console.log(JSON.stringify(responseWithFunctionResult, null, 2))

      return responseWithFunctionResult?.text ?? "No se pudo generar la respuesta final"
    } catch (error) {
      console.error("Error procesando la functionCall:", error)
      return "Ocurrió un error al intentar ejecutar la función."
    }
  }

  return response?.text ?? "No se ha logrado responder con el AgenteIA"
}
