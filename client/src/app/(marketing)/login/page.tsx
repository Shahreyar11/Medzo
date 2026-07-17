"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formValid = credentials.email.trim().length > 0 && credentials.password.length > 0;

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      
      const res = await login({
        email: credentials.email.trim(),
        password: credentials.password
      });
      
      toast.success("Welcome back!");
      router.push("/dashboard"); // Redirect to your protected route

    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      
      // Specific check for your backend 403 Unverified Email response
      if (error.response?.status === 403 && error.response?.data?.redirectTo) {
        toast.error("Please verify your email first.");
        router.push(`/verify?email=${encodeURIComponent(credentials.email.trim())}`);
      } else {
        toast.error(error.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#16423C]/10 shadow-[0_4px_30px_rgba(22,66,60,0.08)] p-8">
        
        <div className="flex flex-col items-center mb-7">
          <PulseMark />
          <h1 className="mt-4 text-2xl font-[Space_Grotesk,sans-serif] font-bold text-[#16423C]">
            Welcome Back
          </h1>
          <p className="text-[#6B7C78] text-sm mt-1">Log in to your Medzo dashboard</p>
        </div>

        <form onSubmit={onLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-[#16423C] mb-1.5 block">Email or Mobile Number</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">
                <Mail size={17} />
              </span>
              <input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#E8A33D]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-[#16423C]">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-[#E8A33D] hover:underline">
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
            type="submit"
            disabled={!formValid || submitting}
            className={`mt-2 w-full py-3 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              !formValid || submitting
                ? "bg-[#16423C]/10 text-[#16423C]/40 cursor-not-allowed"
                : "bg-[#E8A33D] text-[#16423C] shadow-[0_2px_10px_rgba(232,163,61,0.4)] hover:shadow-[0_4px_16px_rgba(232,163,61,0.5)] hover:-translate-y-[1px]"
            }`}
          >
            {submitting && <Loader2 size={17} className="animate-spin" />}
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7C78] mt-6">
          New to Medzo?{" "}
          <Link href="/signup" className="text-[#16423C] font-semibold hover:underline">
            Create an account
          </Link>
        </p>
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