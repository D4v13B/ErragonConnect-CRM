import { Request } from "express";
// import { AuthResponse } from "../adapters/controllers/auth.controllers";

import { AuthResponse } from "../../presentation/controllers/auth.controllers";

export interface RequestCustom extends Request{
   cliente?: AuthResponse
}