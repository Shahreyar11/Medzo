"use client"; // Client Component

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [submitting, setSubmitting] = useState(false); // true only while the request is in flight
  const [showPassword, setShowPassword] = useState(false);

  // form is valid the moment all three fields have something in them
  const formValid = user.email.length > 0 && user.password.length > 0 && user.username.length > 0;

  const onSignup = async () => {
    try {
      setSubmitting(true);

      // posting user to backend signup route
      const res = await axios.post("/api/users/signup", user);
      toast.success("Account created");
      console.log("Signup success", res.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#16423C]/10 shadow-[0_4px_30px_rgba(22,66,60,0.08)] p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-7">
          <PulseMark />
          <h1 className="mt-3 text-2xl font-[Space_Grotesk,sans-serif] font-bold text-[#16423C]">
            {submitting ? "Creating your account..." : "Create your account"}
          </h1>
          <p className="text-[#6B7C78] text-sm mt-1">Join Medzo to manage your clinic visits</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <Field
            id="username"
            label="Username"
            icon={<User size={17} />}
            type="text"
            value={user.username}
            placeholder="john_doe"
            onChange={(v) => setUser({ ...user, username: v })}
          />

          <Field
            id="email"
            label="Email"
            icon={<Mail size={17} />}
            type="email"
            value={user.email}
            placeholder="you@example.com"
            onChange={(v) => setUser({ ...user, email: v })}
          />

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-[#16423C] mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78]">
                <Lock size={17} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="your secret code"
                className="w-full pl-10 pr-10 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] placeholder:text-[#6B7C78]/60 focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#E8A33D]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7C78] hover:text-[#16423C]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            onClick={onSignup}
            disabled={!formValid || submitting}
            className={`mt-2 w-full py-2.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 ${
              !formValid || submitting
                ? "bg-[#16423C]/15 text-[#16423C]/40 cursor-not-allowed"
                : "bg-[#E8A33D] text-[#16423C] shadow-[0_2px_10px_rgba(232,163,61,0.4)] hover:shadow-[0_4px_16px_rgba(232,163,61,0.5)] hover:-translate-y-[1px] active:translate-y-0"
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

/* Reusable labeled input with a left-aligned icon */
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
          className="w-full pl-10 pr-4 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] placeholder:text-[#6B7C78]/60 focus:outline-none focus:border-[#16423C]/50 focus:ring-2 focus:ring-[#E8A33D]/20 transition-all"
        />
      </div>
    </div>
  );
}

/* Same signature pulse-line mark used in the navbar */
function PulseMark() {
  return (
    <svg width="34" height="24" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 11H6L9 3L14 19L17 11H30"
        stroke="#E8A33D"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}