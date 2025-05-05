import { FunctionDeclaration, Type } from "@google/genai"
import { FunctionCall } from "../../db/models/FunctionCall"
import { FunctionCallProp } from "../../db/models/FunctionCallProp"

export interface FunctionDeclarationCustom extends FunctionDeclaration{
  endpoint?: string
}

export async function getAllFunctionCalls(): Promise<FunctionDeclarationCustom[]> {
  const functionCalls = await FunctionCall.findAll({
    include: [{ model: FunctionCallProp, as: "props" }],
  });

  if (!functionCalls.length) {
    return []
    // throw new Error("No hay FunctionCalls registradas en la base de datos.");
  }

  const results: FunctionDeclarationCustom[] = functionCalls.map((functionCall) => {
    const result: FunctionDeclarationCustom = {
      endpoint: functionCall.endpoint,
      name: functionCall.nombre,
      description: functionCall.descipcion,
      parameters: {
        type: Type.OBJECT,
        description: functionCall.descipcion,
        properties: {},
        required: [],
      },
    };

    if (functionCall.props) {
      for (const prop of functionCall.props) {
        (result.parameters?.properties as any)[prop.prop] = {
          // type: Type[prop.type.toUpperCase() as keyof typeof Type], // Mapeo dinámico al ENUM
          type: Type.STRING,
          description: prop.descripcion,
        };

        if (prop.requerido) {
          (result.parameters?.required as string[]).push(prop.prop);
        }
      }
    }

    return result;
  });

  return results;
}
