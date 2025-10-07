import { UserRepository } from "../../../DB";
import { BadRequestException, NotFoundException } from "../../../utlis";
import { VerifyAccountDTO } from "../auth.dto";

export const authProvider = {
  async checkOTP(verifyAccountDTO: VerifyAccountDTO) {
    const userRepository = new UserRepository();

    // دور على اليوزر
    const user = await userRepository.exist({
      email: verifyAccountDTO.email,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // check otp
    if (!user.otp || user.otp !== verifyAccountDTO.otp) {
      throw new BadRequestException("Invalid OTP");
    }

    // check otp expiry
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException("OTP expired");
    }

    // ✅ Success: ممكن هنا تحدد ترجع إيه
    return {
      message: "OTP verified successfully",
      success: true,
      user,
    };
  },
};
