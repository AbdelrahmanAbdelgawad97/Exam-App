import type { GENDER } from "../constant/gender.constant";
import { ROLES } from './../constant/roles.constant';

export type Gender = typeof GENDER[keyof typeof GENDER];
export type ROLES = typeof ROLES[keyof typeof ROLES];

export interface IUser {
    id: string,
    username: string,
    email: string,
    phone: string | null,
    firstName: string,
    lastName: string,
    emailVerified: boolean,
    phoneVerified: boolean,
    role: string,
}

export interface LoginUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: ROLES;
  createdAt: string;
  updatedAt: string;
}
