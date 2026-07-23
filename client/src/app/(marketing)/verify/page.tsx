"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail, resendOtp } from "@/services/auth.service";
import toast from "react-hot-toast";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [emailFromUrl]);

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setVerifying(true);
      await verifyEmail({ email: email.trim(), otp: otp.trim() });
      toast.success("Account verified successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP token.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      await resendOtp(email.trim());
      toast.success("A new validation token was sent to your email!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-5 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#16423C]/10 shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-[#F6F3EC] text-[#E8A33D] rounded-full flex items-center justify-center mb-2">
            <ShieldCheck size={26} />
          </div>
          <h1 className="text-2xl font-bold text-[#16423C]">Verify Account</h1>
          <p className="text-[#6B7C78] text-sm mt-1 text-center">
            Enter the code sent to your email to activate your profile.
          </p>
        </div>

        <form onSubmit={onVerify} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#16423C] mb-1.5 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#16423C] mb-1.5 block">Enter OTP Code</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="######"
              className="w-full text-center tracking-widest text-xl font-mono py-2.5 border border-[#16423C]/15 rounded-xl text-[#16423C] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={verifying || otp.length === 0}
            className={`w-full py-2.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              verifying || otp.length === 0
                ? "bg-[#16423C]/15 text-[#16423C]/40 cursor-not-allowed"
                : "bg-[#E8A33D] text-[#16423C]"
            }`}
          >
            {verifying && <Loader2 size={17} className="animate-spin" />}
            {verifying ? "Validating code..." : "Confirm Verification"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#16423C]/5 text-center flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#16423C] hover:text-[#E8A33D] transition-colors"
          >
            <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
            Resend One-Time Token
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC]">
        <Loader2 className="animate-spin text-[#16423C]" size={32} />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}