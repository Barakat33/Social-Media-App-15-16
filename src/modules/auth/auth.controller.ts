import { Router } from "express";
import { AuthService } from "./auth.service";
import { isvalid } from "../../middleware";
import * as authValidation from "./auth.validation";

const authService = new AuthService();
const router = Router();

// 🟢 Register
router.post(
  "/register",
  isvalid(authValidation.registerSchema),
  authService.register
);

//verify account
router.post("/verify-account", authService.verifyAccount);

//login
router.post("/login", authService.login);

//update password
router.patch("/update-password", authService.updatePassword);

//update basic info
router.patch("/update-basic-info", authService.updateBasicInfo);

//request email update
router.post("/update-email", authService.updateEmail);

//verify new email
router.post("/verify-new-email", authService.verifyNewEmail);

//update -basic info
router.put("/update-basic-info", authService.updateBasicInfo);


export default router;
