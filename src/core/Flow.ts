export type Flow = {
  keywords: string[]
  handler: (
    ctx: { message: string, clientNumber: string },
    tools: { send: (msg: string) => Promise<void> }
  ) => Promise<void>
}

export const createFlow = (
  keywords: string[],
  handler: Flow["handler"]
): Flow => ({
  keywords,
  handler,
})