import {z} from "zod"

export const loginSchema = z.object({
    username: z.string()
    .nonempty("User Name Is Required!"),
    password: z.string().nonempty("Password is required"),
})