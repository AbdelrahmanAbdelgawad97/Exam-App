import { Field, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import useUserInfo from "../../api/quiries/use-user-info";
import { registerSchema } from "../../auth/schemas/register.schema";
import type z from "zod";
import { useState } from "react";
import {SquarePen} from "lucide-react";
import CreateNewEmailComp from "./CreateNewEmailComp";




const emailSchema = registerSchema.pick({
  email: true,
})

export type emailSchema = z.infer<typeof emailSchema>;

export default function UserUpdateEmail() {
    const [overLayOne, setOverLayOne] = useState(false);

    const {data} = useUserInfo();



return (
    <div className="relative">
        <Field>
        <div className="flex items-center justify-between">
            <FieldLabel htmlFor="email">Email Address</FieldLabel>

            <div onClick={()=> setOverLayOne(true)} className="text-[#155DFC] flex items-center gap-2 cursor-pointer font-medium text-sm">
                <SquarePen />
                Change
            </div>
        </div>

        <Input
            type="email"
            className="w-full placeholder:text-[#4B5563]"
            id="email"
            placeholder={data?.email}
            disabled
        />
        </Field>

        {overLayOne &&
        <CreateNewEmailComp overLayOne={overLayOne} setOverLayOne={setOverLayOne}/>
        }
    </div>
)
}
