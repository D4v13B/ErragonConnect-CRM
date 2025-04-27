export const clientNumberFilter = (numero:string):string => {


  return numero.replace(/\D/g, "")
}