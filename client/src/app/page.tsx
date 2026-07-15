"use client"
import { useEffect, useState } from "react";
import {
  ListOrdered,
  FileText,
  FolderHeart,
  ScanText,
  ArrowRight,
  MapPin,
  Activity,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const QUEUE = [
  { token: "041", room: "Room 2", next: ["042", "043", "044"] },
  { token: "042", room: "Room 3", next: ["043", "044", "045"] },
  { token: "043", room: "Room 1", next: ["044", "045", "046"] },
  { token: "044", room: "Room 3", next: ["045", "046", "047"] },
];

export default function Home() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % QUEUE.length), 3200);
    return () => clearInterval(id);
  }, []);

  const current = QUEUE[tick];

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1A2E3B] font-sans selection:bg-[#0F7A6C]/20 antialiased">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#E4F1EE] border border-[#BFDFD9] text-[#0F7A6C] px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Activity size={14} className="animate-pulse" />
            Clinic and hospital software
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A2E3B] leading-[1.15] tracking-tight">
            Every patient, <span className="text-[#0F7A6C] italic font-normal">in order.</span><br />
            Every record, in place.
          </h1>
          <p className="text-[#5C6B70] text-lg leading-relaxed max-w-xl">
            Medzo runs the waiting room, the paperwork, and the patient
            history for clinics and hospitals — from a single consultation
            room to a multi-specialty campus.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a 
              href="#demo" 
              className="group inline-flex items-center gap-2 bg-[#0F7A6C] hover:bg-[#0B5A50] text-white font-semibold px-6 h-12 rounded-xl shadow-md shadow-[#0F7A6C]/10 transition-all duration-200"
            >
              Book a demo 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#features" 
              className="inline-flex items-center justify-center bg-white hover:bg-white/80 border border-[#DCE3E1] text-[#1A2E3B] font-semibold px-6 h-12 rounded-xl transition-all duration-200"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Live Display Graphic Widget */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0F7A6C]/10 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative bg-[#14293D] border border-[#243B50] rounded-2xl p-7 text-white shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-full pointer-events-none" />
            <div className="text-xs uppercase tracking-wider text-[#9FB4C2] font-semibold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Now serving
            </div>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-mono text-6xl font-bold text-[#C9791F] tracking-tight drop-shadow-sm transition-all duration-300">
                {current.token}
              </span>
              <span className="text-xl text-[#C7D6DF] font-medium">
                → {current.room}
              </span>
            </div>
            <div className="border-t border-[#2A3F52] pt-4 space-y-3">
              <div className="text-[11px] uppercase tracking-wider text-[#7E93A2] font-semibold">Up Next</div>
              <div className="flex gap-2.5">
                {current.next.map((n, i) => (
                  <span 
                    className={`font-mono text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                      i === 0 
                        ? "bg-[#1E3348] text-white border border-[#3A5268] font-medium" 
                        : "bg-[#1E3348]/50 text-[#C7D6DF]/70"
                    }`} 
                    key={n}
                  >
                    {i === 0 ? `Next: ${n}` : n}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-[#7E93A2] mt-6 flex items-center gap-1.5 bg-[#1E3348]/30 px-3 py-2 rounded-lg w-fit">
              <span>Waiting room display · updates automatically</span>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Banner */}
      <div className="border-y border-[#DCE3E1] bg-white/40 backdrop-blur-sm py-5 text-center px-6">
        <p className="max-w-4xl mx-auto text-sm font-medium text-[#5C6B70]">
          Built for the way Indian healthcare runs — <span className="text-[#1A2E3B] font-semibold">single-doctor clinics</span>, <span className="text-[#1A2E3B] font-semibold">multi-specialty centres</span>, and <span className="text-[#1A2E3B] font-semibold">district hospitals</span> alike.
        </p>
      </div>

      {/* Grid Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-24" id="features">
        <div className="max-w-xl mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A2E3B]">
            One system, four critical jobs
          </h2>
          <p className="text-[#5C6B70]">
            Everything your front desk and your clinical teams handle daily, unified under one hood.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 gap-px bg-[#DCE3E1] border border-[#DCE3E1] rounded-2xl overflow-hidden shadow-sm bg-opacity-70">
          <div className="group bg-white p-8 hover:bg-[#FBEEDD]/20 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-[#E4F1EE] group-hover:bg-[#0F7A6C] flex items-center justify-center text-[#0F7A6C] group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
              <ListOrdered size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A2E3B] mb-2.5">Queue management</h3>
            <p className="text-[#5C6B70] text-sm leading-relaxed">
              Patients check in and get a token. Everyone sees their exact position live — on the waiting room smart screen or their own smartphone.
            </p>
          </div>

          <div className="group bg-white p-8 hover:bg-[#E4F1EE]/30 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-[#E4F1EE] group-hover:bg-[#0F7A6C] flex items-center justify-center text-[#0F7A6C] group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
              <FileText size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A2E3B] mb-2.5">Patient documentation</h3>
            <p className="text-[#5C6B70] text-sm leading-relaxed">
              Every appointment visit, lab order, and diagnostic note is cataloged instantly against the client record. Instantly searchable years down the line.
            </p>
          </div>

          <div className="group bg-white p-8 hover:bg-[#E4F1EE]/30 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-[#E4F1EE] group-hover:bg-[#0F7A6C] flex items-center justify-center text-[#0F7A6C] group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
              <FolderHeart size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A2E3B] mb-2.5">Unified medical records</h3>
            <p className="text-[#5C6B70] text-sm leading-relaxed">
              A single chronological record timeline per individual across all department visits, skipping fragmented duplicate entry portfolios.
            </p>
          </div>

          <div className="group bg-white p-8 hover:bg-[#FBEEDD]/20 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-[#FBEEDD] group-hover:bg-[#C9791F] flex items-center justify-center text-[#C9791F] group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
              <ScanText size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A2E3B] mb-2.5 flex items-center gap-2">
              Prescription parsing
              <span className="inline-flex bg-[#FBEEDD] text-[#C9791F] font-sans font-bold text-[10px] uppercase px-1.5 py-0.5 rounded">AI</span>
            </h3>
            <p className="text-[#5C6B70] text-sm leading-relaxed">
              Photograph historic handwritten papers. Medzo converts it straight into typed entries — minimizing re-keying mistakes.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase: AI Scanning */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center" id="records">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9791F]">
            <Sparkles size={14} />
            Intelligent Workflow
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A2E3B] leading-tight">
            Old prescriptions, read once and securely stored forever
          </h2>
          <p className="text-[#5C6B70] leading-relaxed">
            Most patients arrive with thick binders of handwritten scripts from external practices. 
            Medzo processes the documents, indexes active compounds and dosages, and builds a digital file background effortlessly.
          </p>
          <div className="pt-2 space-y-2.5">
            {["High-accuracy optical text recognition", "Automated dosage parameter categorization", "Instant clinical graph population"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#1A2E3B]">
                <CheckCircle2 size={16} className="text-[#0F7A6C]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C9791F]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?fm=jpg&q=80&w=1400&auto=format&fit=crop"
            alt="A clinician reviewing patient records on a laptop"
            className="w-full h-80 object-cover rounded-2xl shadow-md border border-[#DCE3E1] transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      </section>

      {/* Feature Showcase: Scale */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center" id="scale">
        <div className="order-2 md:order-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0F7A6C]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src="https://images.unsplash.com/photo-1516841273335-e39b37888115?fm=jpg&q=80&w=1400&auto=format&fit=crop"
            alt="Doctors walking together down a hospital hallway"
            className="w-full h-80 object-cover rounded-2xl shadow-md border border-[#DCE3E1] transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
        <div className="order-1 md:order-2 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F7A6C]">
            <MapPin size={14} />
            Enterprise Scalability
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A2E3B] leading-tight">
            The same dependable system at any volume
          </h2>
          <p className="text-[#5C6B70] leading-relaxed">
            A single-practitioner space and an expanded 500-bed network operate on the identical core ecosystem setup — spin up secondary counters and rooms dynamically without extra retraining hoops.
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DCE3E1]">
            <div>
              <div className="font-mono text-3xl font-bold text-[#1A2E3B]">1</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#7E93A2] mt-1">Doctor Start</div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-[#1A2E3B]">500+</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#7E93A2] mt-1">Available Beds</div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-[#0F7A6C]">0</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#7E93A2] mt-1">Retrain Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Band */}
      <div className="max-w-6xl mx-auto px-6 pb-20" id="demo">
        <div className="relative bg-[#14293D] rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-lg border border-[#243B50]">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0F7A6C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                See Medzo in your facility this week
              </h2>
              <p className="text-[#9FB4C2] max-w-xl text-sm md:text-base">
                We will guide you through your interactive live queue dashboard launch and upload your existing client charts together.
              </p>
            </div>
            <a 
              href="#demo" 
              className="inline-flex items-center justify-center bg-[#0F7A6C] hover:bg-[#0B5A50] text-white font-semibold px-7 h-13 rounded-xl shadow-md transition-all duration-200 shrink-0 self-start lg:self-center"
            >
              Book a live demo
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#DCE3E1] bg-white/40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#5C6B70]">
          <span>© 2026 Medzo Technologies Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-[#0F7A6C] transition-colors">Product Details</a>
            <a href="#scale" className="hover:text-[#0F7A6C] transition-colors">Infrastructure Scale</a>
            <a href="#demo" className="hover:text-[#0F7A6C] transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}