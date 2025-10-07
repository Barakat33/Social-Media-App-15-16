import nodemailer from "nodemailer";
import { devConfig } from "../../config/env/dev.config";
import { MailOptions } from "nodemailer/lib/json-transport";

export const sendEmail =async (mailOption:MailOptions)=>{
const transporter = nodemailer.createTransport({
  //trasport
  service:"gmail",
  auth:{
    user:devConfig.EMAIL_USER,
    pass:devConfig.EMAIL_PASSWORD,
  },
});
mailOption.from=devConfig.EMAIL_USER;
await transporter.sendMail(mailOption);
};


