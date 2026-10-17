import { Button } from '#components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '#components/ui/field'
import { Input } from '#components/ui/input'
import { PhoneInput } from '#components/ui/PhoneInput'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import useUserInfo from '../../api/quiries/use-user-info'
import { registerSchema } from '../../auth/schemas/register.schema'
import z from 'zod'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import UserUpdateEmail from './userUpdateEmail'
import DeleteUserAccount from '../DeleteUserAccount/DeleteUserAccount'
import useUpdateProfile from '../../api/mutations/use-update-profile'


const informationSchema = registerSchema.pick({
  firstName: true,
  lastName: true,
  profilePhoto: true,
  phone: true,
})

export type informationUserSchema = z.infer<typeof informationSchema>;

export default function UserData() {
  const {mutate: setUpdatedProfile}= useUpdateProfile();
  const [deleteUserAccount, setDeleteUserAccount] = useState(false);

  const {data} = useUserInfo();
  const { control , register , reset, handleSubmit , formState} = useForm<informationUserSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePhoto: "",
      phone: "",
    },
    resolver: zodResolver(informationSchema),
  })


  const onSubmit: SubmitHandler<informationUserSchema> = (values) => {
    const phoneNumber = values.phone?.replace(/\s+/g, "").replace(/^(\+20|20)/, "0");
    const allNewData = {
      ...values,
      phone: phoneNumber,
    }
    setUpdatedProfile(allNewData);
  }

  useEffect(()=> {
    if(data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        profilePhoto: "",
        phone: data.phone
      })
    }
  },[data,reset])
  
  return (
    <div className='px-6 py-0' >
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-7 mt-7 ">
          
          <FieldGroup className="grid grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input type="text" id="firstName" className="placeholder:text-black focus:placeholder-transparent"  placeholder={data?.firstName} {...register("firstName")}/>
              {formState.errors.firstName && <FieldError>{formState.errors.firstName.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input type="text" id="lastName" className="placeholder:text-black focus:placeholder-transparent" placeholder={data?.lastName} {...register("lastName")}/>
              {formState.errors.lastName && <FieldError>{formState.errors.lastName.message}</FieldError>}
            </Field>
          </FieldGroup>

            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input disabled type="text" className="w-full placeholder:text-[#4B5563]" id="username" placeholder={data?.username} />
            </Field>

            <UserUpdateEmail />
            {deleteUserAccount && <DeleteUserAccount setDeleteUserAccount={setDeleteUserAccount}/>}

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Controller 
                control={control}
                name="phone"
                render={({field , formState})=>
                  
                  <PhoneInput
                  type="text" 
                  value={field.value} 
                  onChange={field.onChange} 
                  disabled={field.disabled} 
                  placeholder={data?.phone} 
                  className="w-full placeholder:text-black focus:placeholder-transparent" 
                  defaultCountry="EG" 
                  aria-invalid={!!formState.errors.phone}/>
                }
              />
              {formState.errors.phone && <FieldError>{formState.errors.phone.message}</FieldError>}
            </Field>

            <div className='flex justify-between'>
              <Button onClick={()=>setDeleteUserAccount(true)} variant="destructive" className="w-[49%] bg-[#FEF2F2] text-[#DC2626] hover:bg-[#fcc3c3]"> Delete My Account</Button>
              <Button type="submit" variant="default" className="w-[49%]"> Save Change</Button>
            </div>
        </form>
    </div>
  )
}
