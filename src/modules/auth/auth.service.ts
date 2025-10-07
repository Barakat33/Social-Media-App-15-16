import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB/index";
import {
  compareHash,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "../../utlis";
import {
  LoginDTO,
  RegisterDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
  VerifyAccountDTO,
} from "./auth.dto";
import { AuthFactoryService } from "./factory";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utlis/email";
import { authProvider } from "./provider/auth.provider";
import { IUser } from "../../utlis/common/interface";
import { generateToken } from "../../utlis/token";
import { generateOTP, generateExpiryDate } from "../../utlis/OTP/index";

export class AuthService {
  private userRepository = new UserRepository();
  private authFactoryService = new AuthFactoryService();

  constructor() {}

  // 🟢 Register
  register = async (req: Request, res: Response, next: NextFunction) => {
    const registerDTO: RegisterDTO = req.body;

    // check if user exists
    const userExists = await this.userRepository.exist({
      email: registerDTO.email,
    });
    if (userExists) {
      throw new ConflictException("User already exists");
    }

    // create user + otp
    const userData: Partial<IUser> = {
      ...(await this.authFactoryService.createUser(registerDTO)),
      otp: generateOTP(),
      otpExpiry: generateExpiryDate(10),
    } as any;

    await this.userRepository.create(userData);

    const { password, otp, otpExpiry, ...safeUser } = userData as any;

    return res.status(201).json({
      message: "User created successfully.",
      success: true,
      data: safeUser,
    });
  };

  // 🟢 Verify account
  verifyAccount = async (req: Request, res: Response) => {
    const verifyAccountDTO: VerifyAccountDTO = req.body;

    await authProvider.checkOTP(verifyAccountDTO);

    await this.userRepository.update(
      { email: verifyAccountDTO.email },
      { isVerified: true, $unset: { otp: "", otpExpiry: "" } }
    );

    return res.status(204).json({
      message: "Account verified successfully",
      success: true,
    });
  };

  // 🟢 Login
  login = async (req: Request, res: Response) => {
    const loginDTO: LoginDTO = req.body;

    const userExists = await this.userRepository.exist({
      email: loginDTO.email,
    });
    if (!userExists) throw new ForbiddenException("User not found");

    if (!(await compareHash(loginDTO.password, userExists.password))) {
      throw new ForbiddenException("Invalid credentials");
    }

    const accessToken = generateToken({
      payload: {
        _id: userExists._id.toString(),
        role: userExists.role,
      },
      options: { expiresIn: "1d" },
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: { accessToken },
    });
  };

  // 🟢 Update Password
  updatePassword = async (req: any, res: Response) => {
    const userId = req.user._id;
    const updatePasswordDTO: UpdatePasswordDTO = req.body;

    const userExists = await this.userRepository.exist({ _id: userId });
    if (!userExists) throw new NotFoundException("User not found");

    if (!(await compareHash(updatePasswordDTO.currentPassword, userExists.password))) {
      throw new ForbiddenException("Invalid current password");
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDTO.newPassword, 10);

    await this.userRepository.update({ _id: userId }, { password: hashedPassword });

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  };

  // 🟢 Update Basic Info
  updateBasicInfo = async (req: any, res: Response) => {
    const userId = req.user._id;
    const updateDTO: UpdateUserDTO = req.body;

    const userExists = await this.userRepository.exist({ _id: userId });
    if (!userExists) throw new NotFoundException("User not found");

    let updateData: any = {};

    if (updateDTO.fullName) {
      const [firstName, lastName] = updateDTO.fullName.split(" ");
      updateData.firstName = firstName;
      updateData.lastName = lastName;
    }

    if (updateDTO.phoneNumber) updateData.phoneNumber = updateDTO.phoneNumber;
    if (updateDTO.gender) updateData.gender = updateDTO.gender;

    await this.userRepository.update({ _id: userId }, { ...updateData });

    return res.status(200).json({
      message: "Basic info updated successfully",
      success: true,
    });
  };

  // 🟢 Request Email Update
  updateEmail = async (req: any, res: Response) => {
    const { newEmail } = req.body;

    const user = await this.userRepository.exist({ _id: req.user._id });
    if (!user) throw new NotFoundException("User not found");

    const otp = generateOTP();
    const otpExpiry = generateExpiryDate(10);

    await this.userRepository.update(
      { _id: req.user._id },
      { tempEmail: newEmail, otp, otpExpiry }
    );

    await sendEmail({
      to: newEmail,
      subject: "Verify your new email",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    return res.status(200).json({
      message: "Verification code sent to new email",
      success: true,
    });
  };

  // 🟢 Verify New Email
  verifyNewEmail = async (req: Request, res: Response) => {
    const { otp } = req.body;
    const user = await this.userRepository.exist({ _id: (req as any).user._id });
  
    if (!user || !user.otp || !user.otpExpiry || user.otp !== otp || user.otpExpiry < new Date()) {
      throw new ForbiddenException("Invalid or expired OTP");
    }
  
    if (!user.tempEmail) {
      throw new ForbiddenException("No pending email update request found");
    }
  
    // update email after verification
    user.email = user.tempEmail;
    user.tempEmail = undefined;
    user.otp = undefined;
    user.otpExpiry = undefined;
  
    await this.userRepository.update({ _id: (req as any).user._id }, { ...user });
  
    return res.status(200).json({
      message: "Email updated successfully",
      success: true,
    });
  };
  
  
}

export default new AuthService();
