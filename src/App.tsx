import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, MapPin, Link, Download, ArrowUpRight } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data — sourced from Mehdi's CV                                     */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { id: 'about', label: 'Profil' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'certifications', label: 'Certificats' },
  { id: 'contact', label: 'Contact' },
]

const skillGroups = [
  { label: 'Langages', items: ['Java', 'Python', 'PHP', 'JavaScript', 'C'] },
  { label: 'Frameworks', items: ['ASP.NET Core', 'React.js', 'Django', 'Spring Boot', 'Laravel'] },
  { label: 'BI & Data', items: ['Power BI', 'Data Visualisation', 'Data Cleaning', 'KPI Analytics', 'Pandas'] },
  { label: 'Bases de données', items: ['SQL Server', 'PostgreSQL', 'MySQL'] },
  { label: 'Web & APIs', items: ['REST API', 'JWT', 'Chart.js', 'TailwindCSS', 'Bootstrap'] },
  { label: 'Outils', items: ['Git', 'Docker', 'Postman', 'Spring Security'] },
]

const languages = [
  { label: 'Français', level: 'Courant', fill: 100 },
  { label: 'Anglais', level: 'Intermédiaire', fill: 65 },
  { label: 'Arabe', level: 'Langue maternelle', fill: 100 },
]

const softSkills = ['Travail d’équipe', 'Esprit analytique', 'Adaptabilité', 'Résolution de problèmes', 'Gestion de projet']

const experiences = [
  {
    company: 'Emirates Automotive Logistics',
    place: 'Tanger Automotive City — PFE',
    period: '2026 — présent',
    points: [
      'Digitalisation et optimisation du processus Shipping Window pour le suivi des flux logistiques et des opérations quais.',
      'Calcul automatique des statuts d’expédition (On-Time / Early / Late) et de KPI en temps réel.',
      'Conception de dashboards analytiques pour le pilotage des opérations.',
    ],
    stack: ['ASP.NET Core Web API', 'React.js', 'SQL Server', 'Recharts', 'TailwindCSS'],
  },
  {
    company: 'Valeo',
    place: 'Tanger Automotive City',
    period: 'juil. 2025 — août 2025',
    points: [
      'Développement d’une application web de suivi des KPI financiers sous Django.',
      'Automatisation de rapports Excel et mise en place de tableaux de bord interactifs.',
    ],
    stack: ['Django', 'React.js', 'SQL Server', 'Pandas', 'Chart.js'],
  },
  {
    company: 'Emirates Supply Chain Services',
    place: 'TangerMed MedHub',
    period: 'juil. 2024 — août 2024',
    points: [
      'Développement d’une application web de gestion énergétique (TGBT).',
      'Centralisation et automatisation des données en temps réel.',
    ],
    stack: ['Django', 'SQL Server', 'REST API', 'Bootstrap'],
  },
]

const projects = [
  {
    title: 'Empty Pallets Management System',
    year: '2026',
    description: 'Système web de gestion des stocks pour suivre les palettes vides sur plusieurs sites industriels.',
    stack: ['Django', 'Python', 'SQL Server', 'Bootstrap 5', 'Power BI', 'Excel'],
  },
  {
    title: 'AI Career Advisor',
    year: '2025',
    description: 'Plateforme qui analyse le profil d’un étudiant et le marché de l’emploi pour recommander des parcours de carrière.',
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'JWT', 'spaCy'],
  },
  {
    title: 'NLP Sentiment Analysis',
    year: '2025',
    description: 'Pipeline complet d’analyse de sentiments combinant Machine Learning classique et modèles Deep Learning / Transformers.',
    stack: ['Python', 'PyTorch', 'BERT', 'RNN', 'GRU', 'LSTM'],
  },
  {
    title: 'Drive Now — Location de voitures',
    year: '2025',
    description: 'App mobile de location de véhicules : authentification JWT, réservation en temps réel, interface admin pour véhicules et réservations.',
    stack: ['Flutter', 'Spring Boot', 'JWT', 'REST API'],
  },
  {
    title: 'Parking Management System',
    year: '2025',
    description: 'Application web pour automatiser les entrées/sorties, l’occupation en temps réel et le calcul des frais de stationnement.',
    stack: ['Django', 'Python', 'REST API', 'Dashboard'],
  },
  {
    title: 'HikingEvent',
    year: '2025',
    description: 'App mobile pour randonneurs : événements, chat en temps réel, photos et cartes.',
    stack: ['Flutter', 'Firebase', 'Firestore', 'Google Maps SDK', 'FCM'],
  },
  {
    title: 'Bricole',
    year: '2024',
    description: 'Marketplace mettant en relation clients et artisans, avec paiement et avis en ligne.',
    stack: ['Laravel', 'MySQL', 'PHP', 'Bootstrap'],
  },
]

const certifications = [
  { title: 'Software Engineering: Design & Project', org: 'HKUST' },
  { title: 'Foundations of Data Science', org: 'Google' },
  { title: 'Analyste de données', org: 'Microsoft' },
  { title: 'Power BI — Certificat Professionnel', org: 'Microsoft' },
  { title: 'React Native / React Basics', org: 'Meta' },
]

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                     */
/* ------------------------------------------------------------------ */

function useActiveSection() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const els = NAV_ITEMS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: 0.3, rootMargin: '-15% 0px -55% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return active
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-l border-white/10 pl-3">
      <span className="fld-label">{label}</span>
      <span className="fld-value">{value}</span>
    </div>
  )
}

function SheetHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-3">
      <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        {note && <span className="fld-value !text-[13px]">{note}</span>}
        <span className="sheet-tag">{index}</span>
      </div>
    </div>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="tech-tag">{children}</span>
}

/* ------------------------------------------------------------------ */

export default function App() {
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const heroRef = useRef(null)

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .bg-canvas { background-color: #0B141F; }
        .text-ink { color: #E9EFF5; }

        .font-display, .font-body { font-family: 'IBM Plex Sans', system-ui, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        .blueprint-grid {
          background-image:
            linear-gradient(rgba(120,160,200,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,160,200,0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%);
        }

        .muted { color: #85A0B8; }
        .accent { color: #FF7A3D; }
        .accent-cyan { color: #52D6D8; }

        .fld-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: #6C859B;
        }
        .fld-value {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          color: #DCE6EF;
        }

        .sheet-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #6C859B;
          border: 1px solid rgba(255,255,255,0.14);
          padding: 2px 8px;
        }

        .tech-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #B9CCDD;
          border: 1px solid rgba(120,160,200,0.25);
          padding: 3px 8px;
          white-space: nowrap;
        }

        .panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .rule { border-color: rgba(255,255,255,0.1); }

        .nav-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #85A0B8;
          padding: 6px 12px;
          border: 1px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .nav-link.active {
          color: #FF7A3D;
          border-color: rgba(255,122,61,0.35);
        }
        .nav-link:hover { color: #E9EFF5; }

        .corner {
          position: relative;
        }
        .corner::before, .corner::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border: 1px solid rgba(255,122,61,0.55);
        }
        .corner::before { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .corner::after { bottom: -1px; right: -1px; border-left: none; border-top: none; }

        .btn-primary {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          background: #FF7A3D;
          color: #0B141F;
          padding: 10px 18px;
          transition: background 0.15s ease;
        }
        .btn-primary:hover { background: #FF9660; }

        .btn-ghost {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          border: 1px solid rgba(255,255,255,0.18);
          color: #DCE6EF;
          padding: 10px 18px;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.4); }

        .track {
          height: 4px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .track-fill { height: 100%; background: #52D6D8; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {/* progress rail */}
      <motion.div
        style={{ scaleX: barScale }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[#FF7A3D]"
      />

      {/* nav */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0B141F]/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="font-mono text-[13px] muted">
            M.OUAKRIM <span className="accent">/</span> portfolio
          </div>
          <nav className="hidden gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`nav-link ${active === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-5 pb-28 pt-24 sm:px-8">
        {/* HERO / title block */}
        <section id="about" ref={heroRef} className="relative scroll-mt-24 pb-20 pt-10">
          <div className="blueprint-grid pointer-events-none absolute inset-0 -z-10 h-[520px]" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-4 flex items-center gap-2 font-mono text-[13px] accent-cyan">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#52D6D8]" />
              disponible pour un poste full-time
            </div>

            <h1 className="font-display text-[44px] font-semibold leading-[1.05] tracking-tight sm:text-[64px]">
              Mehdi Ouakrim
            </h1>
            <p className="mt-3 max-w-lg font-body text-lg muted">
              Full Stack &amp; Data Engineer — je construis des applications qui relient les
              processus métier, les données et les tableaux de bord qui en découlent.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
              <Field label="Localisation" value="Tanger, Maroc" />
              <Field label="Formation" value="EMSI — Info. & Réseaux" />
              <Field label="Depuis" value="2021 — présent" />
              <Field label="Statut" value="Ingénieur en formation" />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="mailto:mehdiouakrim41@gmail.com" className="btn-primary corner inline-flex items-center gap-2">
                <Mail size={14} /> Me contacter
              </a>
              <a href="/CV_Mehdi_OUAKRIM.pdf" download className="btn-ghost inline-flex items-center gap-2">
                <Download size={14} /> Télécharger le CV
              </a>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-24 py-16">
          <SheetHeading index="02 / 06" title="Expérience professionnelle" note="stages & PFE" />
          <div className="relative space-y-10 border-l border-white/10 pl-8">
            {experiences.map((e, i) => (
              <div key={e.company} className="relative">
                <span className="absolute -left-[41px] top-1 h-2 w-2 rounded-full bg-[#FF7A3D]" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold">{e.company}</h3>
                  <span className="fld-value">{e.period}</span>
                </div>
                <p className="muted mt-0.5 font-body text-sm">{e.place}</p>
                <ul className="mt-3 space-y-1.5 font-body text-[15px] leading-relaxed text-[#CBD8E3]">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.stack.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24 py-16">
          <SheetHeading index="03 / 06" title="Projets sélectionnés" note={`${projects.length} projets`} />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.title} className="panel flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[17px] font-semibold leading-snug">{p.title}</h3>
                    <span className="fld-label shrink-0">{p.year}</span>
                  </div>
                  <p className="muted mt-2 font-body text-[14px] leading-relaxed">{p.description}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-24 py-16">
          <SheetHeading index="04 / 06" title="Compétences techniques" />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.label} className="border-t rule pt-3">
                <p className="fld-label mb-2">{g.label}</p>
                <p className="font-body text-[15px] leading-relaxed text-[#DCE6EF]">
                  {g.items.join(', ')}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="fld-label mb-3">Langues</p>
              <div className="space-y-3">
                {languages.map((l) => (
                  <div key={l.label}>
                    <div className="mb-1 flex justify-between font-body text-[14px]">
                      <span>{l.label}</span>
                      <span className="muted">{l.level}</span>
                    </div>
                    <div className="track">
                      <div className="track-fill" style={{ width: `${l.fill}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="fld-label mb-3">Soft skills</p>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="scroll-mt-24 py-16">
          <SheetHeading index="05 / 06" title="Certifications" />
          <div className="divide-y divide-white/10 border-t border-b rule">
            {certifications.map((c) => (
              <div key={c.title} className="flex items-center justify-between gap-4 py-3.5">
                <span className="font-body text-[15px] text-[#DCE6EF]">{c.title}</span>
                <span className="fld-value shrink-0">{c.org}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 py-16">
          <SheetHeading index="06 / 06" title="Contact" />
          <div className="panel p-6 sm:p-8">
            <p className="max-w-md font-body text-[15px] leading-relaxed text-[#CBD8E3]">
              Ouvert aux postes full-time et aux stages de fin d’études en développement
              full stack ou en ingénierie data / BI.
            </p>
            <div className="mt-6 grid gap-4 border-t rule pt-6 sm:grid-cols-3">
              <a href="mailto:mehdiouakrim41@gmail.com" className="group flex items-center gap-3 font-mono text-[14px]">
                <Mail size={16} className="accent" />
                <span className="text-[#DCE6EF] group-hover:text-white">mehdiouakrim41@gmail.com</span>
              </a>
              <a href="tel:+212781779539" className="group flex items-center gap-3 font-mono text-[14px]">
                <Phone size={16} className="accent" />
                <span className="text-[#DCE6EF] group-hover:text-white">+212 7 81 77 95 39</span>
              </a>
              <div className="flex items-center gap-3 font-mono text-[14px]">
                <MapPin size={16} className="accent" />
                <span className="text-[#DCE6EF]">Tanger, Maroc</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:mehdiouakrim41@gmail.com" className="btn-primary corner inline-flex items-center gap-2">
                Écrire un email <ArrowUpRight size={14} />
              </a>
              <a
              href="https://www.linkedin.com/in/mehdiouakrim/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <Link size={14} /> LinkedIn
            </a>
            </div>
          </div>
        </section>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t rule pt-6 font-mono text-[12px] muted">
          <span>© {new Date().getFullYear()} Mehdi Ouakrim</span>
          <span>Tanger, Maroc — N 35.7595° W 5.8340°</span>
        </footer>
      </main>
    </div>
  )
}