import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

type SectionId = (typeof NAV_ITEMS)[number]['id']

const skills = {
  frontend: ['React', 'Tailwind CSS', 'Framer Motion'],
  backend: ['ASP.NET Core', 'Spring Boot', 'Django', 'Laravel'],
  dataBi: ['Power BI', 'Pandas', 'ETL Automation', 'Excel Automation'],
  databases: ['SQL Server', 'PostgreSQL', 'MySQL'],
  devops: ['Docker', 'Git', 'REST API'],
}

const projects = [
  {
    title: 'Empty Palettes Management System (2026)',
    description:
      'Web-based inventory management system to track empty pallets across industrial sites.',
    stack: ['Django', 'Python', 'SQL Server', 'Bootstrap 5', 'Power BI', 'Excel Integration'],
  },
  {
    title: 'AI Career Advisor (2026)',
    description:
      'Platform analyzing student profiles and job market trends to recommend tailored career paths.',
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'JWT', 'spaCy'],
  },
  {
    title: 'HikingEvent (2025)',
    description:
      'Mobile app for hiking enthusiasts with events, real-time chat, photos, and maps.',
    stack: ['Flutter', 'Firebase', 'Firestore', 'Google Maps SDK', 'FCM'],
  },
  {
    title: 'Bricole Platform (2024)',
    description:
      'Marketplace connecting clients with professionals for home services and online payments.',
    stack: ['Laravel', 'MySQL', 'Stripe', 'PHP'],
  },
]

const experiences = [
  {
    company: 'Valeo',
    role: 'Finance Department – Intern',
    period: 'KPI Dashboard & Automation',
    description:
      'Built KPI dashboards and automated Excel reports, reducing manual work and improving visibility.',
  },
  {
    company: 'Emirates Supply Chain Services',
    role: 'IT Department – Intern',
    period: 'Energy / TGBT Application',
    description:
      'Developed an internal app to centralize energy data and support energy efficiency decisions.',
  },
]

function useActiveSection(defaultSection: SectionId = 'about'): SectionId {
  const [active, setActive] = useState<SectionId>(defaultSection)

  useEffect(() => {
    const elements = NAV_ITEMS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible[0]) setActive(visible[0].target.id as SectionId)
      },
      { threshold: 0.35 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

function Navbar({ active }: { active: SectionId }) {
  return (
    <div className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-md backdrop-blur"
        >
          <span className="font-semibold text-slate-900">Mehdi Ouakrim</span>

          <div className="hidden gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`rounded-full px-3 py-1.5 transition ${
                  item.id === active
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.nav>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, kicker }: { eyebrow?: string; title: string; kicker?: string }) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
      {kicker && <p className="max-w-2xl text-slate-600">{kicker}</p>}
    </div>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
      {label}
    </span>
  )
}

export default function App() {
  const activeSection = useActiveSection()
  const { scrollYProgress } = useScroll()
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar active={activeSection} />

      {/* soft background glow */}
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 top-[-10rem] h-80 w-80 rounded-full bg-cyan-200/60 blur-3xl" />
        <div className="absolute right-[-2rem] top-[20%] h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute left-[10%] bottom-[-4rem] h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
      </motion.div>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 space-y-24">
        {/* About / Hero */}
        <section id="about" className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            Open for full-time & junior developer roles
          </span>
          <h1 className="text-4xl font-bold">Mehdi Ouakrim</h1>
          <p className="text-slate-600">Full Stack Developer · Data & BI Engineer</p>
          <p className="max-w-xl text-slate-600">
            I build full stack applications that connect business workflows, data pipelines, and dashboards.
          </p>
        </section>


       {/* Experience */}
        <section id="experience" className="scroll-mt-28">
          <SectionHeader eyebrow="Experiences" title="Professional Experiences" kicker="Internships & real-world impact." />
          <div className="space-y-4">
            {experiences.map((e) => (
              <div key={e.company} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold">{e.company}</p>
                <p className="text-slate-600">{e.role}</p>
                <p className="text-sm text-slate-500">{e.period}</p>
                <p className="mt-2 text-slate-700">{e.description}</p>
              </div>
            ))}
          </div>
        </section>


        

        {/* Projects */}
        <section id="projects" className="scroll-mt-28">
          <SectionHeader eyebrow="Projects" title="Selected Projects" kicker="Academic & real-world projects." />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-slate-600">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
<section id="skills" className="scroll-mt-28">
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <SectionHeader
      eyebrow="Skills"
      title="Technical Stack"
      kicker="Frontend, backend & data tools I use."
    />

    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="font-medium text-slate-900">Frontend</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.frontend.map((s) => (
            <Badge key={s} label={s} />
          ))}
        </div>

        <p className="mt-5 font-medium text-slate-900">Backend</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.backend.map((s) => (
            <Badge key={s} label={s} />
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium text-slate-900">Data / BI</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.dataBi.map((s) => (
            <Badge key={s} label={s} />
          ))}
        </div>

        <p className="mt-5 font-medium text-slate-900">Databases</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.databases.map((s) => (
            <Badge key={s} label={s} />
          ))}
        </div>

        <p className="mt-5 font-medium text-slate-900">DevOps</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.devops.map((s) => (
            <Badge key={s} label={s} />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Contact */}
        <section id="contact" className="scroll-mt-28 text-center">
          <h2 className="text-2xl font-semibold">Let’s talk about job opportunities.</h2>
          <p className="mt-2 text-slate-600">
            Open to full-time and junior Full Stack roles where code, data, and business meet.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <a
              href="mailto:mehdiouakrim41@gmail.com"
              className="rounded-full bg-cyan-500 px-6 py-2.5 text-white hover:bg-cyan-600"
            >
              Email Me
            </a>
            <a
              href="/CV_OUAKRIM_Mehdi.pdf"
              download
              className="rounded-full border border-slate-300 px-6 py-2.5 hover:bg-slate-100"
            >
              Download CV
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
