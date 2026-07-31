import api from "@/lib/api"; // or wherever your axios instance is
import {
  ClinicRegisterBody,
  ClinicLoginBody,
} from "@/types/clinic";

// Register Clinic (No registrationNumber in the data payload anymore!)
export const registerClinic = (data: ClinicRegisterBody) =>
  api.post("/clinic/register", data);

// Login Clinic (Accepts either email or registrationNumber + password)
export const loginClinic = (data: ClinicLoginBody) =>
  api.post("/clinic/login", data);