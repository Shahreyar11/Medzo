"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings,
  Bell
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
      try {
        setLoggingOut(true);
        // Try to tell the backend to kill the session
        await api.post("/api/auth/logout");
      } catch (error) {
        // Even if the backend complains (e.g., token already expired), 
        // we don't care. We still want to kick them out of the UI.
        console.error("Logout sync issue:", error);
      } finally {
        // ALWAYS redirect to login. The backend cleared the cookie, 
        // or the cookie was already dead.
        toast.success("Logged out successfully");
        router.push("/login");
      }
    };

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#DCE3E1] hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-[#DCE3E1]">
          <div className="w-8 h-8 rounded-lg bg-[#0F7A6C] flex items-center justify-center font-mono font-bold text-white mr-3 shadow-sm">
            M
          </div>
          <span className="font-serif text-xl font-semibold text-[#1A2E3B]">Medzo</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <NavItem icon={<Users size={18} />} label="Patients" />
          <NavItem icon={<Calendar size={18} />} label="Appointments" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-[#DCE3E1]">
          <button 
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-[#5C6B70] hover:text-[#C9791F] hover:bg-[#FBEEDD]/50 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            {loggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#DCE3E1] flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-serif font-medium text-[#1A2E3B]">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-[#DCE3E1] flex items-center justify-center text-[#5C6B70] hover:bg-[#F4F7F6] transition-colors">
              <Bell size={18} />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#0F7A6C] flex items-center justify-center text-white font-medium shadow-sm">
              Dr
            </div>
          </div>
        </header>

        {/* Dashboard Widgets */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Welcome Banner */}
            <div className="bg-[#14293D] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-[#243B50]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F7A6C]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-medium mb-2">Welcome back to Medzo</h2>
                <p className="text-[#9FB4C2] max-w-lg text-sm leading-relaxed">
                  Your secure session is active. You have 12 appointments scheduled for today across 3 rooms.
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Patients" value="1,248" trend="+12 this week" />
              <StatCard title="Today's Queue" value="42" trend="14 currently waiting" />
              <StatCard title="Prescriptions Parsed" value="856" trend="High accuracy" />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable micro-components for the Dashboard UI
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      active 
        ? "bg-[#E4F1EE] text-[#0F7A6C]" 
        : "text-[#5C6B70] hover:bg-white hover:text-[#1A2E3B]"
    }`}>
      {icon}
      {label}
    </a>
  );
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#DCE3E1] shadow-sm">
      <h3 className="text-sm font-medium text-[#5C6B70]">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-mono font-bold text-[#1A2E3B]">{value}</span>
      </div>
      <div className="mt-3 inline-flex items-center px-2 py-1 rounded-md bg-[#FBEEDD]/50 text-xs font-semibold text-[#C9791F]">
        {trend}
      </div>
    </div>
  );
}