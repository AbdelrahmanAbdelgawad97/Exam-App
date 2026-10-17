import {z} from "zode"
import {loginSchema} from  "../schemas/login.schema"

export type LoginFormValue = z.infer<typeof loginSchema>;

export interface LoginResponse {
    user: IUser,
    token: string,
}