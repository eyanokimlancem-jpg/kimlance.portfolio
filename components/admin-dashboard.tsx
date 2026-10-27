"use client";

import { LogOut, MessageSquareText, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";

export type AdminMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt: string;
  replies: Array<{
    id: string;
    content: string;
    authorRole: string;
    createdAt: string;
  }>;
};

export default function AdminDashboard({
  messages,
  adminEmail,
}: {
  messages: AdminMessage[];
  adminEmail: string;
}) {
  const [items, setItems] = useState(messages);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  async function handleReply(messageId: string) {
    const content = (replyDrafts[messageId] ?? "").trim();

    if (!content) {
      setErrorMap((current) => ({ ...current, [messageId]: "Reply cannot be empty." }));
      return;
    }

    setIsSubmitting((current) => ({ ...current, [messageId]: true }));
    setErrorMap((current) => ({ ...current, [messageId]: "" }));

    try {
      const response = await fetch("/api/admin/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send the reply.");
      }

      setItems((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                status: "replied",
                replies: [
                  ...(message.replies ?? []),
                  {
                    id: result.reply.id,
                    content: result.reply.content,
                    authorRole: result.reply.authorRole,
                    createdAt: result.reply.createdAt,
                  },
                ],
              }
            : message,
        ),
      );

      setReplyDrafts((current) => ({ ...current, [messageId]: "" }));
    } catch (error) {
      setErrorMap((current) => ({
        ...current,
        [messageId]: error instanceof Error ? error.message : "Unable to send the reply.",
      }));
    } finally {
      setIsSubmitting((current) => ({ ...current, [messageId]: false }));
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-screen bg-[#040b17] px-5 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Admin dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Inbox management</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {adminEmail}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400/40"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/15 bg-slate-900/50 p-10 text-center text-slate-300">
              No messages yet. When someone contacts you, they will appear here.
            </div>
          ) : (
            items.map((message) => (
              <div key={message.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{message.subject}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{message.name}</h2>
                  </div>
                  <span className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                    {message.status}
                  </span>
                </div>

                <div className="mb-5 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500">Email</span>
                    {message.email}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500">Received</span>
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mb-5 rounded-xl border border-white/10 bg-slate-950/40 p-4 text-slate-200">
                  <div className="mb-2 flex items-center gap-2 text-cyan-300">
                    <MessageSquareText className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.2em]">Message</span>
                  </div>
                  <p className="whitespace-pre-wrap leading-7">{message.message}</p>
                </div>

                {message.replies.length > 0 && (
                  <div className="mb-5 space-y-3">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-emerald-200">
                          <span>{reply.authorRole}</span>
                          <span>{new Date(reply.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="whitespace-pre-wrap text-slate-200">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                  <label htmlFor={`reply-${message.id}`} className="mb-2 block text-sm text-slate-300">
                    Reply to this message
                  </label>
                  <textarea
                    id={`reply-${message.id}`}
                    value={replyDrafts[message.id] ?? ""}
                    onChange={(event) => setReplyDrafts((current) => ({ ...current, [message.id]: event.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                    placeholder="Write a professional response..."
                  />

                  {errorMap[message.id] && (
                    <div className="mt-3 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                      {errorMap[message.id]}
                    </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleReply(message.id)}
                      disabled={isSubmitting[message.id]}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 font-medium text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting[message.id] ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
