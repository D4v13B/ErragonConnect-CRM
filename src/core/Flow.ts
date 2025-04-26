export type Flow = {
  keywords: string[]
  handler: (message: string) => Promise<string>
}

export const createFlow = (
  keywords: string[],
  handler: Flow["handler"]
): Flow => ({
  keywords,
  handler,
})
