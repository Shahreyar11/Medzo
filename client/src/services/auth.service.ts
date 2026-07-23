import api from "@/lib/api";
import { RegisterBody, LoginBody, VerifyBody, ResetPasswordBody } from "@/types/auth";

// Notice that the endpoint path matches your backend router definitions:
export const register = (data: RegisterBody) =>
  api.post("/auth/register", data);

export const login = (data: LoginBody) =>
  api.post("/auth/login", data);

export const verifyEmail = (data: VerifyBody) =>
  api.post("/auth/verify-account", data);

export const resendOtp = (email: string) =>
  api.post("/auth/resend-otp", { email });

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (data: ResetPasswordBody) =>
  api.post("/auth/reset-password", data);