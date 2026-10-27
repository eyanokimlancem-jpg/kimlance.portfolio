"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Database,
  Download,
  Mail,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Palette,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import ContactForm from "@/components/contact-form";
import { profile, projects, services, skillGroups } from "@/lib/content";

const skillIcons: Record<string, typeof MonitorSmartphone> = {
  Monitor: MonitorSmartphone,
  ServerCog: Database,
  Database: Database,
  Smartphone: Phone,
  Palette: Palette,
  Wrench: Wrench,
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative overflow-hidden bg-[#040b17] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 text-sm font-bold text-cyan-300">
              KL
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">KIM LANCE</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="rounded-full border border-white/10 bg-white/5 p-2 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-slate-950/90 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-slate-300">
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            Available for software projects
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-5 max-w-2xl text-lg font-medium text-cyan-300 md:text-xl">
            {profile.headline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]"
            >
              View My Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-6 py-3 font-semibold text-violet-100 transition hover:border-violet-300 hover:bg-violet-500/15"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_60px_rgba(14,165,233,0.25)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-slate-950/70 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
                    KL
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Portfolio</p>
                    <p className="font-semibold text-white">Developer Profile</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                  Online
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Focus</p>
                  <p className="text-xl font-semibold text-white">Modern web and software solutions</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
                    <Code2 className="mb-3 h-8 w-8 text-cyan-300" />
                    <p className="text-sm text-slate-300">Frontend</p>
                    <p className="mt-1 text-lg font-semibold text-white">Next.js</p>
                  </div>
                  <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4">
                    <Database className="mb-3 h-8 w-8 text-violet-300" />
                    <p className="text-sm text-slate-300">Backend</p>
                    <p className="mt-1 text-lg font-semibold text-white">Prisma + PostgreSQL</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Core strengths</p>
                    <Briefcase className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Web Development', 'Systems Development', 'UI/UX', 'IT Graduate'].map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">About Me</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Building practical digital experiences</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="text-lg leading-8 text-slate-300">{profile.about}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Background</p>
              <p className="mt-3 text-lg font-semibold text-white">Bachelor of Science in Information Technology</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Interests</p>
              <p className="mt-3 text-lg font-semibold text-white">Software, web, systems, and tech solutions</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-300">Technical Skills</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Capabilities I bring to projects</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = skillIcons[group.icon] || MonitorSmartphone;
            return (
              <motion.article
                key={group.title}
                whileHover={{ y: -4 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Featured Projects</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Selected work and project highlights</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -6 }}
              className="group rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <div className="mb-5 flex min-h-[180px] items-center justify-center rounded-[1.5rem] border border-dashed border-cyan-400/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-center">
                <div>
                  <div className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-200">
                    {project.category}
                  </div>
                  <p className="text-xl font-semibold text-white">{project.placeholder}</p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{project.type}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                </div>
                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-200">
                  {project.status}
                </span>
              </div>

              <p className="mb-5 text-base leading-7 text-slate-300">{project.description}</p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-200">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`#project-${project.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </a>
                {project.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400/40"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-300">Services</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">What I can help you build</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                {index % 2 === 0 ? <MonitorSmartphone className="h-5 w-5" /> : <MessageSquareText className="h-5 w-5" />}
              </div>
              <p className="text-lg font-semibold text-white">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Contact</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Send me a message</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Get in touch</p>
                <p className="text-lg font-semibold text-white">Kim Lance Eyano</p>
              </div>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>For project inquiries, collaborations, or software development opportunities.</p>
              <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" /> kimlanceeyano@gmail.com</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
