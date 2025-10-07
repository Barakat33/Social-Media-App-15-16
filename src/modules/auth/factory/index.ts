import { SYS_ROLE, USER_AGENT } from "../../../utlis/common/enum";
import { generateHash } from "../../../utlis/hash";
import { generateExpiryDate, generateOTP } from "../../../utlis/OTP";
import { RegisterDTO } from "../auth.dto";
import { User } from "../../../DB/model/user/user.model";

export class AuthFactoryService {
    async createUser(registerDTO:RegisterDTO){
        const user = new User();
        user.fullName = registerDTO.fullName;
        user.email = registerDTO.email;
        user.password =await generateHash(registerDTO.password);
        user.phoneNumber = registerDTO.phoneNumber as string;// encrpt phone number
        user.otp = generateOTP();
        user.otpExpiry = generateExpiryDate(5*60*60*1000) as unknown as Date;
        user.credentialsUpdatedAt = new Date();
        user.role = SYS_ROLE.user;
        user.gender = registerDTO.gender;
        user.userAgent = USER_AGENT.local;
        user.isVerified = false;
        return user;
    }
}