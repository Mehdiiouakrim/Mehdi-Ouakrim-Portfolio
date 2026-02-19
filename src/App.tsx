import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Experinces' },
  { id: 'experience', label: 'Projects' },
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
    title: 'Empty Palettes Management System (Mini Project 2026)',
    description:
      'Web-based inventory management system developed to track and manage empty pallets across multiple industrial sites.',
    stack: [
      'Django',
      'Python',
      'SQL Server',
      'Bootstrap 5',
      'Power BI',
      'Excel Integration'
    ],
  },
  {
    title: 'AI Career Advisor (Academic Project 2026)',
    description:
      'Intelligent platform that analyzes student profiles and job market trends to recommend tailored career paths and learning roadmaps.',
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'JWT','spaCy'],
  },
  
  {
  title: 'HikingEvent (Academic Project 2025)',
  description:
    'Community-based mobile application for hiking enthusiasts. Allows users to create and join hiking events, chat in real time, and share photos with interactive maps. Built with Flutter and Firebase using an MVC architecture.',
  stack: ['Flutter', 'Firebase', 'Firestore', 'Google Maps SDK', 'FCM'],
 },
 {
    title: 'Bricole Platform (Academic Project 2024)',
    description:
      'Marketplace connecting clients with local professionals for home services, including secure online payments and booking management.',
    stack: ['Laravel', 'MySQL', 'Stripe', 'Php'],
 },
  
]

const experiences = [
  {
    company: 'Valeo',
    role: 'Finance Department – Intern',
    period: 'Finance KPI Dashboard & Automation',
    description:
      'Built KPI dashboards and automated recurring Excel reports, improving visibility on financial performance and reducing manual work.',
  },
  {
    company: 'Emirates Supply Chain Services',
    role: 'IT Department – Intern',
    period: 'Energy / TGBT Application',
    description:
      'Developed an internal web app to centralize energy data, expose REST APIs, and support energy efficiency decisions.',
  },
]

function useActiveSection(defaultSection: SectionId = 'about'): SectionId {
  const [active, setActive] = useState<SectionId>(defaultSection)

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((s) => s.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop)

        if (visibleSections[0]) {
          const id = visibleSections[0].target.id as SectionId
          setActive(id)
        }
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
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-between rounded-3xl border border-slate-800/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-[0_0_40px_rgba(15,23,42,0.75)] backdrop-blur-xl sm:px-6"
        >
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-400 to-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Portfolio</p>
              <p className="text-sm font-semibold text-slate-100">Mehdi Ouakrim</p>
            </div>
          </div>

          <div className="hidden items-center gap-1 rounded-full bg-slate-900/80 px-1 py-0.5 text-xs sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === active
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id)
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`relative rounded-full px-3 py-1.5 transition ${
                    isActive
                      ? 'text-slate-50'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 via-indigo-500/25 to-sky-500/25 shadow-[0_0_30px_rgba(56,189,248,0.75)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </div>
        </motion.nav>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, kicker }: { eyebrow?: string; title: string; kicker?: string }) {
  return (
    <div className="mb-8 space-y-3 text-left sm:mb-10">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/80">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{title}</h2>
      {kicker && <p className="max-w-2xl text-sm text-slate-400 sm:text-base">{kicker}</p>}
    </div>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-100 shadow-[0_0_20px_rgba(8,145,178,0.4)]"
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
      {label}
    </motion.span>
  )
}

export default function App() {
  const activeSection = useActiveSection()
  const { scrollYProgress } = useScroll()
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.1])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar active={activeSection} />

      <motion.div
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-[-10rem] h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-[-2rem] top-[20%] h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute left-[10%] bottom-[-4rem] h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      </motion.div>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:gap-28">
        {/* Hero */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Open for full-time & junior developer roles</span>
          </div>

          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Mehdi Ouakrim
            <span className="mt-2 block text-lg font-normal text-slate-300 sm:text-xl">
              Full Stack Developer · Data & BI Engineer
            </span>
          </h1>

          <p className="text-sm font-medium text-cyan-200/90 sm:text-base">
            React · ASP.NET Core · SQL Server · Power BI
          </p>

          <p className="max-w-xl text-sm text-slate-400 sm:text-base">
            I build full stack applications that connect business workflows, data pipelines, and dashboards.
          </p>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Skills"
            title="A stack for full stack & data projects."
            kicker="Frontend, backend, and data tools I use daily."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Frontend</p>
              <div className="flex flex-wrap gap-2 mt-2">{skills.frontend.map((s) => <Badge key={s} label={s} />)}</div>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-400">Backend</p>
              <div className="flex flex-wrap gap-2 mt-2">{skills.backend.map((s) => <Badge key={s} label={s} />)}</div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Data / BI</p>
              <div className="flex flex-wrap gap-2 mt-2">{skills.dataBi.map((s) => <Badge key={s} label={s} />)}</div>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-400">Databases</p>
              <div className="flex flex-wrap gap-2 mt-2">{skills.databases.map((s) => <Badge key={s} label={s} />)}</div>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-400">DevOps</p>
              <div className="flex flex-wrap gap-2 mt-2">{skills.devops.map((s) => <Badge key={s} label={s} />)}</div>
            </div>
          </div>
        </section>
        
        {/* Experience */}
        <section id="experience" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Experiences"
            title="Internships & real-world impact."
            kicker="Hands-on experience with finance and IT teams."
          />
          <div className="space-y-6">
            {experiences.map((e) => (
              <div key={e.company} className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{e.company}</p>
                <p className="mt-1 font-medium text-slate-100">{e.role}</p>
                <p className="mt-1 text-xs text-slate-400">{e.period}</p>
                <p className="mt-3 text-sm text-slate-300">{e.description}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Projects */}
        <section id="projects" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Projects"
            title="Selected projects."
            kicker="Academic, internship, and real-world projects."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.title} className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
                <h3 className="font-semibold text-slate-50">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-28 text-center">
          <h2 className="text-2xl font-semibold">Let’s talk about my next job opportunity.</h2>
          <p className="mt-3 text-sm text-slate-300">
            I’m open to full-time and junior Full Stack roles where code, data, and business meet.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="mailto:mehdiouakrim41@gmail.com"
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-slate-950 font-medium"
            >
              Email Me
            </a>
            <a
              href="/Mehdi_Ouakrim_CV.pdf"
              download
              className="rounded-full border border-slate-700/80 px-5 py-2.5"
            >
              Download CV
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
