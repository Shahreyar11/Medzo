export interface ClinicRegisterBody {
  // registrationNumber is removed from here
  clinicName: string;
  address: string;
  phone?: string | null;
  email: string;
  password: string;
}

export interface ClinicLoginBody {
  registrationNumber?: string;
  email?: string;
  password: string;
}