"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message right now.");
      }

      setForm(initialState);
      setFeedback({
        type: "success",
        message: "Your message has been sent successfully. I will get back to you soon.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="mb-2 block text-sm text-slate-300">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
          placeholder="Project inquiry"
          required
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
          placeholder="Tell me about your idea..."
          required
        />
      </div>

      {feedback && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
              : "border-rose-400/30 bg-rose-500/10 text-rose-200"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Mail className="h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
        <Send className="h-4 w-4 text-cyan-300" />
      </div>
    </form>
  );
}
