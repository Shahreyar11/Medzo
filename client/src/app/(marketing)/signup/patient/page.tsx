"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";
import toast from "react-hot-toast";
import { signupSchema } from "@/schemas/auth.schema";
import { Mail, Lock, User, Eye, EyeOff, Loader2, Phone } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formValid =
    user.firstName.trim().length > 0 &&
    user.lastName.trim().length > 0 &&
    user.email.trim().length > 0 &&
    user.password.length > 0;

  const onSignup = async () => {
    try {
      setSubmitting(true);
      
      // Changed to undefined to prevent Prisma schema rejection on empty strings
      const payload = {
        ...user,
        mobileNumber: user.mobileNumber.trim() === "" ? undefined : user.mobileNumber.trim(),
      };

      //.trim() removes extra spaces 

      const result = signupSchema.safeParse(payload);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }      

      const res = await register(payload);
      toast.success("Account created! Check your email for the verification code.");
      
      router.push(`/verify?email=${encodeURIComponent(user.email.trim())}`);
    } catch (error: any) {
      console.error("Signup Error Details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5 py-12 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#16423C]/10 shadow-[0_4px_30px_rgba(22,66,60,0.08)] p-8">
        <div className="flex flex-col items-center mb-7">
          <PulseMark />
          <h1 className="mt-4 text-2xl font-[Space_Grotesk,sans-serif] font-bold text-[#16423C]">
            Create your account
          </h1>
          <p className="text-[#6B7C78] text-sm mt-1">Join Medzo to manage your clinic visits</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field
              id="firstName"
              label="First Name"
              icon={<User size={17} />}
              type="text"
              value={user.firstName}
              placeholder="John"
              onChange={(v: string) => setUser({ ...user, firstName: v })}
            />
            <Field
              id="lastName"
              label="Last Name"
              icon={<User size={17} />}
              type="text"
              value={user.lastName}
              placeholder="Doe"
              onChange={(v: string) => setUser({ ...user, lastName: v })}
            />
          </div>

          <Field
            id="email"
            label="Email Address"
            icon={<Mail size={17} />}
            type="email"
            value={user.email}
            placeholder="you@example.com"
            onChange={(v: string) => setUser({ ...user, email: v })}
          />

          <Field
            id="mobileNumber"
            label="Mobile Number (Optional)"
            icon={<Phone size={17} />}
            type="tel"
            value={user.mobileNumber}
            placeholder="+91 XXXXX XXXXX"
            onChange={(v: string) => setUser({ ...user, mobileNumber: v })}
          />

          <div>
            <label className="text-sm font-semibold text-[#16423C] mb-1.5 block">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">
                <Lock size={17} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Choose a secure password"
                className="w-full pl-10 pr-10 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#E8A33D]/20 transition-all"
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
            className={`mt-2 w-full py-3 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              !formValid || submitting
                ? "bg-[#16423C]/10 text-[#16423C]/40 cursor-not-allowed"
                : "bg-[#E8A33D] text-[#16423C] shadow-[0_2px_10px_rgba(232,163,61,0.4)] hover:shadow-[0_4px_16px_rgba(232,163,61,0.5)] hover:-translate-y-[1px]"
            }`}
          >
            {submitting && <Loader2 size={17} className="animate-spin" />}
            {submitting ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-sm text-[#6B7C78] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#16423C] font-semibold hover:underline">
            Log in
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
          className="w-full pl-10 pr-4 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#E8A33D]/20 transition-all"
        />
      </div>
    </div>
  );
}

function PulseMark() {
  return (
    <svg width="34" height="24" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 11H6L9 3L14 19L17 11H30" stroke="#E8A33D" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}