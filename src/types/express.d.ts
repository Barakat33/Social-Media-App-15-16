import { IUser } from "../utlis/common/interface";

declare global {
  namespace Express {
    interface Request {
      user: IUser; // IUser already extends Document
    }
  }
}

export {};
