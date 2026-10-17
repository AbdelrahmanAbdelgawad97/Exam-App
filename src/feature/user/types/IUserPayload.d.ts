import LoginUser from "./user"

export interface IUserPayload {
  user: LoginUser;
}


export interface IUserProfilePayload {
    payload: IUserPayload,
}