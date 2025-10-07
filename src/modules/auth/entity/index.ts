import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utlis/common/enum";

export class User {
  public fullName: string = "";
  public email: string = "";
  public password: string = "";
  public credentialsUpdatedAt: Date = new Date();
  public phoneNumber?: string;
  public role: SYS_ROLE = SYS_ROLE.user;
  public gender: GENDER = GENDER.male;
  public userAgent: USER_AGENT = USER_AGENT.local;
  public otp: string = "";
  public otpExpiry: Date = new Date();
}
