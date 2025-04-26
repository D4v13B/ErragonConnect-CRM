import { createFlow } from "../core/Flow";

export const welcomeFlow = createFlow(["hello", "hi"], async() => {
  return 'Welcome to the bot'
})