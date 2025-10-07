import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import { IUser } from "../../../utlis/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utlis/common/enum";
import { send } from "process";
import { sendEmail } from "../../../utlis/email";

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tempEmail: { type: String },
    password: {
      type: String,
      required: function () {
        return (this as any).userAgent !== USER_AGENT.google;
      },
    },
    credentialsUpdatedAt: { type: Date },
    phoneNumber: { type: String },
    role: {
      type: Number,
      enum: Object.values(SYS_ROLE),
      default: SYS_ROLE.user,
    },
    gender: {
      type: Number,
      enum: Object.values(GENDER),
      default: GENDER.male,
    },
    userAgent: {
      type: Number,
      enum: Object.values(USER_AGENT),
      default: USER_AGENT.local,
    },
    isVerified:{type:Boolean,default:false},
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


userSchema.pre("save",async function(next){
  if(this.userAgent != USER_AGENT.google && this.isNew==true) 
  await sendEmail({
    to: this.email,
    subject: "conform",
    html:`<h1> your otp is ${this.otp}</h1>`},
  )
  next(new Error(""));
});

// Virtual fullName
userSchema
  .virtual("fullName")
  .get(function (this: any) {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (this: any, value: string) {
    const [fName, lName] = value.split(" ");
    this.firstName = fName;
    this.lastName = lName;
  });

// 🆕 hash password قبل ما يتسيف
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // لو الباسورد متغيرش متعملش hash تاني
  this.password = await bcrypt.hash(this.password, 10); // saltRounds = 10
  next();
});

// 🆕 method للمقارنة
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
