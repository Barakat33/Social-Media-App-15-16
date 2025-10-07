import bcrypt from "bcryptjs";
export const generateHash = (planText :string)=>{
    return bcrypt.hashSync(planText,10);
}

export const compareHash =async (password :string,hashPassword: string)=>{
    return await bcrypt.compare(password, hashPassword);
}