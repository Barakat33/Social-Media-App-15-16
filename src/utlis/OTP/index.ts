// 🟢 Generate a 6-digit OTP
export const generateOTP = (): string => {
    return (Math.floor(100000 + Math.random() * 900000)).toString();
  };
  
  // 🕒 Generate expiry date (in minutes)
  export const generateExpiryDate = (minutes: number): Date => {
    return new Date(Date.now() + minutes * 60 * 1000);
  };
  