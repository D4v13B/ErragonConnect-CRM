export interface ILogMessage {
  numeroCliente: string
  fromMe: boolean
  body: string
  usuaId?: number
}

export const logMessage = async({numeroCliente, fromMe, body, usuaId}:ILogMessage) => {

}