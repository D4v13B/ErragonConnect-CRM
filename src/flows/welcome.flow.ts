import { createFlow } from "../core/Flow"

export const welcomeFlow = createFlow(
  ["hello", "hi"],
  async ({ message }, { send }) => {
    
    await send("Hola, Bienvenido al Imalaya")
    // return 'Welcome to the bot'
  }
)
