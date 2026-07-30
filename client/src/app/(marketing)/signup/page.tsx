"use client";

import { useRouter } from "next/navigation";
import { User, Building2 } from "lucide-react";

export default function SignupChoice() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#16423C]">
            Create your Medzo Account
          </h1>
          <p className="text-[#6B7C78] mt-2">
            Choose how you want to use Medzo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl p-8 border border-[#16423C]/10 shadow hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-full bg-[#E8A33D]/20 flex items-center justify-center mb-5">
              <User size={28} className="text-[#16423C]" />
            </div>

            <h2 className="text-2xl font-bold text-[#16423C]">
              Patient
            </h2>

            <p className="text-[#6B7C78] mt-3 mb-8">
              Book appointments, manage prescriptions, access medical records,
              and track your healthcare journey.
            </p>

            <button
              onClick={() => router.push("/signup/patient")}
              className="w-full py-3 rounded-full bg-[#E8A33D] text-[#16423C] font-bold hover:opacity-90"
            >
              Continue as Patient
            </button>
          </div>

          {/* Hospital Card */}
          <div className="bg-white rounded-2xl p-8 border border-[#16423C]/10 shadow hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-full bg-[#16423C]/10 flex items-center justify-center mb-5">
              <Building2 size={28} className="text-[#16423C]" />
            </div>

            <h2 className="text-2xl font-bold text-[#16423C]">
              Hospital / Clinic
            </h2>

            <p className="text-[#6B7C78] mt-3 mb-8">
              Register your hospital or clinic to manage doctors,
              appointments, queues, and patient records.
            </p>

            <button
              onClick={() => router.push("/signup/hospital")}
              className="w-full py-3 rounded-full bg-[#16423C] text-white font-bold hover:opacity-90"
            >
              Continue as Hospital
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}