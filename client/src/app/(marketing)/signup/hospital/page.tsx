"use client";

import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function HospitalSignup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#16423C]/10 shadow-[0_4px_30px_rgba(22,66,60,0.08)] p-8 text-center">

        <div className="w-16 h-16 mx-auto rounded-full bg-[#16423C]/10 flex items-center justify-center">
          <Building2 size={30} className="text-[#16423C]" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-[#16423C]">
          Hospital / Clinic Signup
        </h1>

        <p className="mt-3 text-[#6B7C78] leading-7">
          We're currently building the hospital onboarding experience.
          <br />
          It will be available soon.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/signup"
            className="w-full py-3 rounded-full bg-[#16423C] text-white font-semibold hover:opacity-90 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <Link
            href="/signup/patient"
            className="w-full py-3 rounded-full border border-[#16423C]/20 text-[#16423C] font-semibold hover:bg-[#16423C]/5"
          >
            Continue as Patient
          </Link>
        </div>
      </div>
    </div>
  );
}