import { JwtPayload } from "jsonwebtoken";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../enum";
import { Request } from "express";
import { Document, ObjectId, Types } from "mongoose";
export interface IAttachment {
  url: string;
  id: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  tempEmail?: string | undefined;
  password: string;
  credentialsUpdatedAt: Date;
  phoneNumber?: string | undefined;
  role: SYS_ROLE;
  gender: GENDER;
  userAgent: USER_AGENT;
  otp?: string | undefined;
  otpExpiry?: Date | undefined;
  isVerified: boolean;
  _id: Types.ObjectId;
}

export interface IComment{
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  parentId?: Types.ObjectId | null; // nullable for top-level comments
  attachments?: IAttachment[];
  reactions: IReaction[];
  mentions?: Types.ObjectId[]; 
}

export interface IPayload extends JwtPayload {
  id: string;
  email: string;
  role: SYS_ROLE;
}

export interface IAuthUser extends Request {
  user: IUser & Document;
}

export interface IReaction {
  reaction: REACTION;
  userId: Types.ObjectId;
}

export interface IPost {
  userId: Types.ObjectId;
  content: string;
  reactions: IReaction[];
  attachments?: IAttachment[];
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    _id: string;
    role: number;
  }
}