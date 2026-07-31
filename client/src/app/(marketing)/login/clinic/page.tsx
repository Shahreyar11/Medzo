"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginClinic } from "@/services/clinic.service";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff, Loader2, Building2, UserCircle } from "lucide-react";

export default function Clinic_Login() {
  const router = useRouter();
  
  // Track a generic 'identifier' instead of just registrationNumber
  const [credentials, setCredentials] = useState({
    identifier: "", 
    password: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formValid = 
    credentials.identifier.trim().length > 0 && 
    credentials.password.length > 0;

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      
      const input = credentials.identifier.trim();
      // Smart detection: If it has an '@', it's an email. Otherwise, it's a Reg Number.
      const isEmail = input.includes("@");
      
      await loginClinic({
        email: isEmail ? input : undefined,
        registrationNumber: !isEmail ? input : undefined,
        password: credentials.password
      });
      
      toast.success("Clinic dashboard accessed!");
      router.push("/dashboard"); 

    } catch (error: any) {
      console.error("Clinic Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#16423C]/10 shadow-[0_4px_30px_rgba(22,66,60,0.08)] p-8">
        
        <div className="flex flex-col items-center mb-7">
          <div className="w-12 h-12 rounded-full bg-[#16423C]/10 flex items-center justify-center mb-3">
            <Building2 size={24} className="text-[#16423C]" />
          </div>
          <h1 className="text-2xl font-[Space_Grotesk,sans-serif] font-bold text-[#16423C] text-center">
            Clinic Login
          </h1>
          <p className="text-[#6B7C78] text-sm mt-1 text-center">
            Access your facility dashboard
          </p>
        </div>

        <form onSubmit={onLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-[#16423C] mb-1.5 block">
              Email or Registration Number
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">
                <UserCircle size={17} />
              </span>
              <input
                type="text"
                value={credentials.identifier}
                onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
                placeholder="email or REG-12345"
                className="w-full pl-10 pr-4 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#16423C]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-[#16423C]">Password</label>
              <Link href="/forgot-password/clinic" className="text-xs font-semibold text-[#16423C] hover:underline opacity-80">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">
                <Lock size={17} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter your password"
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
            type="submit"
            disabled={!formValid || submitting}
            className={`mt-2 w-full py-3 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              !formValid || submitting
                ? "bg-[#16423C]/10 text-[#16423C]/40 cursor-not-allowed"
                : "bg-[#16423C] text-white shadow-[0_4px_14px_rgba(22,66,60,0.3)] hover:shadow-[0_6px_20px_rgba(22,66,60,0.4)] hover:-translate-y-[1px]"
            }`}
          >
            {submitting && <Loader2 size={17} className="animate-spin text-white" />}
            {submitting ? "Authenticating..." : "Log In to Dashboard"}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7C78] mt-6">
          Is your clinic new to Medzo?{" "}
          <Link href="/signup/clinic" className="text-[#16423C] font-semibold hover:underline">
            Register facility
          </Link>
        </p>
      </div>
    </div>
  );
}