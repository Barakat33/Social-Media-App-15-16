import { GENDER } from "../../utlis/common/enum";

//DTO data to object
export interface RegisterDTO{
    fullName:string;
    email:string;
    password:string;
    phoneNumber?:string;
    gender:GENDER;
}

export interface UpdateUserDTO{
    fullName?:string;
    email?:string;
    password?:string;
    phoneNumber?:string;
    gender?:GENDER;
}


export interface LoginDTO {
    email: string;
    password: string;
}


export interface ConfirmEmailDTO {
    email: string;
    otp: string;
}

export interface VerifyAccountDTO {
    email: string;
    otp: string;
}

export interface UpdatePasswordDTO {
    currentPassword: string;
    newPassword: string;
}  