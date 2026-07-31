"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerClinic } from "@/services/clinic.service";
import toast from "react-hot-toast";
import { clinicSignupSchema } from "@/schemas/auth.schema";
import { 
  Mail, 
  Lock, 
  Building2, 
  Eye, 
  EyeOff, 
  Loader2, 
  Phone,
  MapPin 
} from "lucide-react";

export default function Clinic_Signup() {
  const router = useRouter();
  const [clinic, setClinic] = useState({
    clinicName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formValid = 
    clinic.clinicName.trim().length > 0 &&
    clinic.address.trim().length > 0 &&
    clinic.email.trim().length > 0 &&
    clinic.password.length > 0;

  const onSignup = async () => {
    try {
      setSubmitting(true);
      const payload = {
        ...clinic,
        phone: clinic.phone.trim() === "" ? undefined : clinic.phone.trim(), 
      };

      // Ensure your zod schema (clinicSignupSchema) is also updated to NOT require registrationNumber
      const result = clinicSignupSchema.safeParse(payload);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      // Axios returns the server response in the `data` property
      const res = await registerClinic(payload);
      
      // Extract the generated number from your backend response
      const generatedRegNumber = res.data.registrationNumber;

      // Show a toast that lasts 10 seconds so they have time to copy/read it
      toast.success(
        `Registered successfully! Your Registration ID is: ${generatedRegNumber}`,
        { duration: 10000 }
      );
      
      router.push("/login/clinic");

    } catch (error: any) {
      console.error("Clinic Signup Error Details", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed."); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5 py-12 font-[Manrope,sans-serif]">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#16423C]/10 shadow-[0_4px_30px_rgba(22,66,60,0.08)] p-8">
        <div className="flex flex-col items-center mb-7">
          <div className="w-12 h-12 rounded-full bg-[#16423C]/10 flex items-center justify-center mb-3">
            <Building2 size={24} className="text-[#16423C]" />
          </div>
          <h1 className="text-2xl font-[Space_Grotesk,sans-serif] font-bold text-[#16423C] text-center">
            Register your Clinic
          </h1>
          <p className="text-[#6B7C78] text-sm mt-1 text-center">
            Set up your hospital or clinic to manage your workflow
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Field
            id="clinicName"
            label="Clinic / Hospital Name"
            icon={<Building2 size={17} />}
            type="text"
            value={clinic.clinicName}
            placeholder="City Care Hospital"
            onChange={(v: string) => setClinic({ ...clinic, clinicName: v })}
          />

          <Field
            id="address"
            label="Full Address"
            icon={<MapPin size={17} />}
            type="text"
            value={clinic.address}
            placeholder="123 Health Ave, Medical District"
            onChange={(v: string) => setClinic({ ...clinic, address: v })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              id="email"
              label="Official Email"
              icon={<Mail size={17} />}
              type="email"
              value={clinic.email}
              placeholder="admin@clinic.com"
              onChange={(v: string) => setClinic({ ...clinic, email: v })}
            />
            <Field
              id="phone"
              label="Contact Number (Optional)"
              icon={<Phone size={17} />}
              type="tel"
              value={clinic.phone}
              placeholder="+91 XXXXX XXXXX"
              onChange={(v: string) => setClinic({ ...clinic, phone: v })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#16423C] mb-1.5 block">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">
                <Lock size={17} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={clinic.password}
                onChange={(e) => setClinic({ ...clinic, password: e.target.value })}
                placeholder="Choose a secure password"
                className="w-full pl-10 pr-10 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#16423C]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78] hover:text-[#16423C]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            onClick={onSignup}
            disabled={!formValid || submitting}
            className={`mt-3 w-full py-3 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              !formValid || submitting
                ? "bg-[#16423C]/10 text-[#16423C]/40 cursor-not-allowed"
                : "bg-[#16423C] text-white shadow-[0_4px_14px_rgba(22,66,60,0.3)] hover:shadow-[0_6px_20px_rgba(22,66,60,0.4)] hover:-translate-y-[1px]"
            }`}
          >
            {submitting && <Loader2 size={17} className="animate-spin text-white" />}
            {submitting ? "Registering..." : "Register Clinic"}
          </button>
        </div>

        <p className="text-center text-sm text-[#6B7C78] mt-6">
          Already registered?{" "}
          <Link href="/login/clinic" className="text-[#16423C] font-semibold hover:underline">
            Log in to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ id, label, icon, type, value, placeholder, onChange }: any) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-[#16423C] mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#16423C]/20 transition-all"
        />
      </div>
    </div>
  );
}