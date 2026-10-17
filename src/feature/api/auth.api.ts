import { api } from "../../shared/lib/axios";
import type { ISuccessResponse } from "../../shared/types/api";
import type { IRegisterFormValue, IverifyOtbResponse } from "../auth/types/register";
import type { LoginFormValue, LoginResponse } from "../auth/types/login";
import { AUTH_ENDPOINT, USER_ENDPOINT } from "./auth.endpoint";
import getToken from "../../hooks/use-token"
import type { IUserProfilePayload } from "../user/types/IUserPayload";
import type { informationUserSchema } from "../user/UserInfo/UserData";
import type { IpasswordFormValues } from "../user/UserInfo/UserChangePassword";
import type { ResendPassToMail } from "../user/types/iSendPassToMail";
import type { ModifiedPasswordData } from "../user/types/iModifyForgotenPass";

let theToken = getToken().getToken();

export async function loginApi (values: LoginFormValue) {
    const response = await api.post<ISuccessResponse<LoginResponse>>(`${AUTH_ENDPOINT}/login`, values);
    return response.data;
}

export async function sendOtpApi(email: Pick<IRegisterFormValue, "email">) {
    const response = await api.post<IverifyOtbResponse>(`${AUTH_ENDPOINT}/send-email-verification`,email)
    return response.data
}

export async function verifyEmailApi({email, code}: {email: IRegisterFormValue["email"], code: string}) {
    const response = await api.post<IverifyOtbResponse>(`${AUTH_ENDPOINT}/confirm-email-verification`,{email, code})
    return response.data
}

export async function createAccount(values: IRegisterFormValue) {
    const response = await api.post<LoginResponse>(`${AUTH_ENDPOINT}/register`, values);
    return response.data;
}

/* User Api =====================================> */

/* get profile */

export async function getCurrentUserProfile() {
    theToken = getToken().getToken();
    const response = await api.get<IUserProfilePayload>(`${USER_ENDPOINT}/profile`,
    {
        headers: {
            Authorization: `Bearer ${theToken}`,
        },
    }
    );
    return response.data.payload.user;
}

/* update profile */

export async function setUpdatedProfile(values: informationUserSchema) {
    // console.log("Api======>", values);
    theToken = getToken().getToken();
    const response = await api.patch(`${USER_ENDPOINT}/profile`,
        values,
    {
        headers: {
            Authorization: `Bearer ${theToken}`,
        },
        
    }
    );
    return response .data;
}
/* Send Email OTB */
export async function sendUpdatedEmailOtb(newEmail: Pick<IRegisterFormValue, "newEmail">) {
    theToken = getToken().getToken();
    const response = await api.post<IverifyOtbResponse>(`${USER_ENDPOINT}/email/request`,newEmail,
        {
            headers: {
                Authorization: `Bearer ${theToken}`,
            },
        
        }
    )
    return response.data
}

/* Confirm OTB */

export async function confirmUpdatedEmailOtb(code: {code: string}) {
    theToken = getToken().getToken();
    const response = await api.post<IverifyOtbResponse>(`${USER_ENDPOINT}/email/confirm`,code,
        {
            headers: {
                Authorization: `Bearer ${theToken}`,
            },
        
        }
    )
    return response.data
}

/* Change Password */

export async function userChangePassword(password: IpasswordFormValues) {
    theToken = getToken().getToken();
    const response = await api.post<IpasswordFormValues>(`${USER_ENDPOINT}/change-password`,password,
        {
            headers: {
                Authorization: `Bearer ${theToken}`,
            },
        
        }
    )
    return response.data
}
/* Delete Account */

export async function deleteOwnAccount() {
    theToken = getToken().getToken();
    const response = await api.delete(`${USER_ENDPOINT}/account`,
        {
            headers: {
                Authorization: `Bearer ${theToken}`,
            },
        }
    )
    return response.data
}

/* reSend New Password through mail */
export async function resendPassowrToEmail(values: ResendPassToMail) {
    const response = await api.post(`${AUTH_ENDPOINT}/forgot-password`,values);
    return response.data
}

/* reSend New Password through mail */
export async function resetPassword(value:ModifiedPasswordData) {
    console.log(value)
    const response = await api.post(`${AUTH_ENDPOINT}/reset-password`,value);
    console.log(response.data)
    return response.data
}