export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string | null;
  password: string;
}

export interface LoginBody {
  email: string;
  password?: string;
}

export interface VerifyBody {
  email: string;
  otp: string;
}

export interface ResetPasswordBody {
  password?: string;
}