"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminDashboard, { type AdminMessage } from "@/components/admin-dashboard";

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetch("/api/admin/messages", { method: "GET" });

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        const payload = await response.json();
        setMessages(payload.messages ?? []);
        setAdminEmail(payload.adminEmail ?? "");
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#040b17] text-slate-100">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 backdrop-blur-xl">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
          Loading messages...
        </div>
      </main>
    );
  }

  if (!adminEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#040b17] px-5">
        <div className="rounded-[2rem] border border-amber-400/30 bg-amber-500/10 p-8 text-center text-amber-100">
          <ShieldAlert className="mx-auto mb-4 h-8 w-8" />
          You are not authorized to view this page.
        </div>
      </main>
    );
  }

  return <AdminDashboard messages={messages} adminEmail={adminEmail} />;
}
