import { FunctionDeclaration, Type } from "@google/genai"
import { FunctionCall } from "../../db/models/FunctionCall" // Ajusta la ruta si es necesario
import { FunctionCallProp } from "../../db/models/FunctionCallProp"
import { FunctionDeclarationCustom } from "./getAllFunCalls"

export async function getFunctionCallByName(
  nombre: string
): Promise<FunctionDeclarationCustom> {
  const functionCall = await FunctionCall.findOne({
    where: { nombre },
    include: [{ model: FunctionCallProp, as: "props" }],
  })

  if (!functionCall) {
    throw new Error("FunctionCall no encontrado")
  }

  const result : FunctionDeclarationCustom = {
    name: functionCall.nombre,
    description: functionCall.descipcion,
    parameters: {
      type: Type.OBJECT,
      description: functionCall.descipcion,
      properties: {},
      required: [] as string[],
    },
  }

  if (functionCall.props) {
    for (const prop of functionCall.props) {
      (result.parameters?.properties as any)[prop.prop] = {
        type: Type[prop.type.toUpperCase() as keyof typeof Type], // Mapeo dinámico al ENUM
        description: prop.descripcion,
      };

      if (prop.requerido) {
        (result.parameters?.required as string[]).push(prop.prop);
      }
    }
  }

  return result
}
