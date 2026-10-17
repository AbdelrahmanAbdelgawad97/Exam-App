import { isValidPhoneNumber } from "react-phone-number-input";
import {z} from "zod"

export const registerSchema = z.object({
    username: z.string("Please entry your name")
    .nonempty("User Name Is Required!")
    .min(2,"User Name should be at least 2 character")
    .max(50,"User Name should be maximum 50 character"),

    email: z.email({error: (iss) => (iss.code === "invalid_type" ? "Please Entry Your Email" : "Invalid email address")}),
    // email: z.email({error: (iss) => (iss.input ? "Invalid email address" : "Please Entry Yout email")}),

    password: z.string("PLease entry your Password")
    .nonempty("Password is required")
    .min(8,"Password should be at leatest 8 character")
    .regex(/[A-Z]/,"Password should contain at least one upper case character")
    .regex(/[a-z]/,"Password should contain at least one lower case character")
    .regex(/[0-9]/,"Password should contain at least one Number"),

    confirmPassword: z.string("Confirm Password is Requierd"),

    firstName: z.string("Please Entry Last Name")
    .nonempty("First Name Is Required!")
    .min(2,"First Name should be at least 2 character")
    .max(50,"First Name should be maximum 50 character"),

    lastName: z.string("Please Entry Last Name")
    .nonempty("Last Name Is Required!")
    .min(2,"Last Name should be at least 2 character")
    .max(50,"Last Name should be maximum 50 character"),

    phone: z
    .string("Phone number is Requierd")
    .nonempty("Phone number is Requierd")
    .refine(value => isValidPhoneNumber(value , {defaultCountry: "EG"}))
    .optional(),

    profilePhoto: z.string(""),
    
});