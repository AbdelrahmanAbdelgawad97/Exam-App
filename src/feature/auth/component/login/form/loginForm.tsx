import { useForm, FormProvider, type SubmitHandler } from "react-hook-form"
import type { LoginFormValue } from "../../../types/login"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "../../../schemas/login.schema"
import { Field ,FieldLabel, FieldDescription, FieldError } from "../../../../../components/ui/field";
import { Input } from "../../../../../components/ui//input";
import { Button } from "../../../../../components/ui/button";
import { Link } from "react-router";
import { useLogin } from "../../../../api/mutations/use-login";
import FormFeedback from "../../../../../shared/components/form-feedback";
import DirectedTo from "../../../shared/component/DirectedTo";
export default function LoginForm() {

  const {mutate: login, error, isPending} = useLogin();


  const form = useForm<LoginFormValue>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })


  const onSubmit: SubmitHandler<LoginFormValue> = function (values) {
    login(values);
    
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-113 h-full max-h-101.5 flex flex-col gap-4">
        <Field aria-invalid={!!form.formState.errors.username}>
          <FieldLabel htmlFor="username">username</FieldLabel>
          <Input id="username" type="text" placeholder="Entry Your Name" {...form.register("username")}/>
          {form.formState.errors?.username && <FieldError>{form.formState.errors.username.message}</FieldError>}
        </Field>

        <Field aria-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="password">password</FieldLabel>
          <Input id="password" type="password" placeholder="Entry Your password" {...form.register("password")}/>
          
          <FieldDescription>
            <Button nativeButton={false} variant="link" render={<Link to="/forgot-password">Forgot Your password ?</Link>}/>
          </FieldDescription>

          {form.formState.errors?.password && <FieldError>{form.formState.errors.password.message}</FieldError>}
        </Field>

        <FormFeedback>{error?.message}</FormFeedback>
        <Button variant="outline" type="submit" className="self-end mt-2 w-full" isLoading={isPending}
          disabled = {(form.formState.isSubmitted && !form.formState.isValid) || isPending}
        > Login </Button>
      </form>
      <DirectedTo haveOrNot={"Don't have an account yet?"} pageName={"Create yours"} link={"/register"}/>
    </FormProvider>
  )
}
