"use client"

import { useState, useEffect, FormEvent } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import FadeIn from "@/components/fade-in"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import { Shield, Users, Terminal, Radio, Target, CheckCircle2 } from "lucide-react"

const AnimatedBackground = dynamic(() => import("@/components/animted-bg"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black bg-gradient-to-br from-black to-[#050906]" />,
})

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  college: "KIET Group of Institutions",
  branch: "",
  rollno: "",
  othercollege: "",
  documentKey: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [collegeOption, setCollegeOption] = useState<"kiet" | "other">("kiet");
  const [whatsappChecked, setWhatsappChecked] = useState(false);
  const [discordChecked, setDiscordChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const router = useRouter();
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setWhatsappChecked(checked);
    if (checked) window.open("https://chat.whatsapp.com/YOUR_WHATSAPP_GROUP_LINK", "_blank");
  };

  const handleDiscordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setDiscordChecked(checked);
    if (checked) window.open("https://discord.gg/EXq267jVA", "_blank");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!whatsappChecked || !discordChecked) {
      toast.error("Please join both community groups to continue.");
      setIsLoading(false);
      return;
    }

    if (!privacyChecked) {
      toast.error("You must accept the privacy policy.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/register/`, formData);
      toast.success("Registration successful! Prepare for battle.");
      setTimeout(() => router.push("/"), 2500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="poppins relative min-h-screen text-white bg-[#050906] overflow-hidden pt-44 pb-24">
      <ToastContainer position="bottom-left" theme="dark" />

      <div className="fixed inset-0 z-10 pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* AMBIENT LIGHTING */}
      <div className="absolute top-0 w-full h-[100vh] bg-gradient-to-b from-[#218c63]/20 to-transparent pointer-events-none z-15" />

      <div className="max-w-4xl mx-auto px-6 relative z-20">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-[7rem] font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Join the <span className="text-[#218c63]">Battle</span>
            </h1>
            <p className="text-white font-black uppercase tracking-[0.4em] text-sm md:text-lg opacity-60">
              Secure your slot in the community hub.
            </p>
          </div>

        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 md:p-20 shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Smith"
                  icon={<Users className="w-3.5 h-3.5 text-[#218c63]" />}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@university.edu"
                  type="email"
                  icon={<Terminal className="w-3.5 h-3.5 text-[#218c63]" />}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={(e: any) => {
                    if (/^\d{0,10}$/.test(e.target.value)) handleInputChange(e);
                  }}
                  placeholder="9876543210"
                  type="tel"
                  icon={<Radio className="w-3.5 h-3.5 text-[#218c63]" />}
                />

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-[#218c63] flex items-center gap-2">
                    <Target className="w-3 h-3" /> Institution Type
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-white/5 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setCollegeOption("kiet")}
                      className={`py-3 rounded-lg text-xs font-black tracking-widest transition-all ${collegeOption === "kiet" ? "bg-[#218c63] text-white shadow-[0_0_15px_rgba(33,140,99,0.5)]" : "text-gray-400 hover:text-white"}`}
                    >
                      KIET
                    </button>
                    <button
                      type="button"
                      onClick={() => setCollegeOption("other")}
                      className={`py-3 rounded-lg text-xs font-black tracking-widest transition-all ${collegeOption === "other" ? "bg-[#218c63] text-white shadow-[0_0_15px_rgba(33,140,99,0.5)]" : "text-gray-400 hover:text-white"}`}
                    >
                      OTHER
                    </button>
                  </div>
                </div>
              </div>

              {collegeOption === "other" && (
                <div className="animate-fadeIn">
                  <InputField
                    label="Organisation / College Name"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="MIT Media Lab / Acme Corp"
                  />
                </div>
              )}

              {collegeOption === "kiet" && (
                <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                  <InputField
                    label="Roll Number"
                    name="rollno"
                    value={formData.rollno}
                    onChange={handleInputChange}
                    placeholder="2100290100042"
                  />
                  <InputField
                    label="Branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    placeholder="Computer Science & Engineering"
                  />
                </div>
              )}

              <div className="pt-8 border-t border-white/5">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#218c63] text-center mb-6">Join our community — Required</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CommunityLink
                    checked={whatsappChecked}
                    onChange={handleWhatsappChange}
                    label="Join WhatsApp"
                    icon={
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.058 23.267a.5.5 0 0 0 .611.635l5.555-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.012-1.374l-.36-.214-3.724.977.998-3.645-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                      </svg>
                    }
                  />
                  <CommunityLink
                    checked={discordChecked}
                    onChange={handleDiscordChange}
                    label="Join Discord"
                    icon={
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* PRIVACY POLICY CHECKBOX */}
              <div className="flex items-center justify-center gap-3 py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${privacyChecked ? "bg-[#218c63] border-[#218c63]" : "bg-white/5 border-white/20 group-hover:border-[#218c63]"}`}>
                    {privacyChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={privacyChecked}
                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                    I accept the <Link href="/privacy" className="text-[#218c63] hover:underline underline-offset-4">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={addRipple}
                  className="group relative overflow-hidden max-w-sm w-full py-6 rounded-2xl bg-[#218c63] text-white font-black text-xl uppercase tracking-[0.15em] transition-all duration-500 shadow-[0_0_40px_rgba(33,140,99,0.4)] hover:shadow-[0_0_60px_rgba(33,140,99,0.7)] hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none border border-[#218c63]/30"
                >
                  {/* Shimmer sweep on hover */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  {/* Ripple spots */}
                  {ripples.map(r => (
                    <span
                      key={r.id}
                      className="absolute rounded-full bg-white/25 animate-ripple pointer-events-none"
                      style={{ left: `${r.x}px`, top: `${r.y}px` }}
                    />
                  ))}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Join the Battle"
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

function InputField({ label, name, value, onChange, placeholder, type = "text", icon }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-[0.35em] text-[#218c63]/80 flex items-center gap-2">
        {icon} {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-white/[0.04] border border-white/8 text-white rounded-lg px-4 py-3.5 outline-none font-medium text-sm placeholder:text-white/20 focus:border-[#218c63]/50 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(33,140,99,0.1)] transition-all"
      />
    </div>
  )
}

function CommunityLink({ checked, onChange, label, icon }: any) {
  return (
    <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${checked
      ? "bg-[#218c63]/15 border-[#218c63]/50 shadow-[0_0_20px_rgba(33,140,99,0.1)]"
      : "bg-white/[0.02] border-white/5 hover:border-[#218c63]/25 hover:bg-white/[0.04]"
      }`}>
      <div className={`shrink-0 transition-colors duration-300 ${checked ? "text-[#218c63]" : "text-gray-600 group-hover:text-[#218c63]/60"
        }`}>
        {icon}
      </div>
      <span className={`font-black uppercase tracking-[0.2em] text-base transition-colors duration-300 ${checked ? "text-white" : "text-gray-500 group-hover:text-gray-300"
        }`}>{label}</span>
      <div className={`ml-auto w-6 h-6 rounded-lg flex items-center justify-center border-2 shrink-0 transition-all ${checked ? "bg-[#218c63] border-[#218c63]" : "border-white/10 group-hover:border-[#218c63]/40"
        }`}>
        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    </label>
  )
}
