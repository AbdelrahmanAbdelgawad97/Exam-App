
import type { registerSchema } from '../schemas/register.schema';
import { REGISTER_STEPS } from '../constatns/formConstant';

export type IRegisterStep = typeof REGISTER_STEPS[keyof typeof REGISTER_STEPS];

export type IRegisterFormValue = z.infer<typeof registerSchema>;

export interface IverifyOtbResponse {
    message: string,
}

/* 
keyof => to access the keys and it working in types so should make REGISTER_STEPS types not values

*/