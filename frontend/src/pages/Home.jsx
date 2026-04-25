import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Eye, Ghost, MoonStar, Radar, ShieldAlert, Sparkles, Webhook } from 'lucide-react'
import { caseApi } from '../api/caseApi'
import { systemApi } from '../api/systemApi'
import { normalizeItem } from '../utils/helpers'
import CaseCard from '../components/CaseCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [backendOnline, setBackendOnline] = useState(false)
  const [cases, setCases] = useState([])
  const [fictions, setFictions] = useState([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        await systemApi.health()
        setBackendOnline(true)
        const [caseRows, fictionRows] = await Promise.all([caseApi.getCases(), caseApi.getFictions()])
        setCases(caseRows.map((x) => normalizeItem(x, 'case')))
        setFictions(fictionRows.map((x) => normalizeItem(x, 'fiction')))
      } catch {
        setBackendOnline(false)
        setError('Unable to load archives right now.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const stats = useMemo(() => {
    const all = [...cases, ...fictions]
    const solved = all.filter((x) => /solved|closed/i.test(`${x.title} ${x.body}`)).length
    const unsolved = Math.max(all.length - solved, 0)
    return { total: all.length, solved, unsolved, reports: all.length }
  }, [cases, fictions])

  const featured = useMemo(() => cases.slice(0, 3), [cases])
  const recent = useMemo(
    () => [
      ...fictions.map((item) => ({ ...item, kind: 'fiction' })),
      ...cases.map((item) => ({ ...item, kind: 'case' })),
    ].slice(0, 3),
    [cases, fictions],
  )

  return (
    <div className="space-y-10 body-font">
      <div className={`horror-panel rounded-xl px-4 py-2 text-sm ${backendOnline ? 'border-ecto/40 text-ecto glow-green' : 'border-blood/40 text-blood glow-red'}`}>
        Backend status: {backendOnline ? 'Connected' : 'Disconnected'}
      </div>

      <section className="horror-panel scratched-border relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-ghost/10 blur-xl" />
        <div className="absolute right-6 top-4 flex h-28 w-28 items-center justify-center text-7xl opacity-20">👻</div>
        <div className="absolute bottom-0 left-0 text-6xl opacity-15">🦇</div>
        <div className="relative z-10 max-w-3xl space-y-5">
          <p className="case-font inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-zinc-300">
            <MoonStar size={12} className="text-ghost" /> Haunted Investigation Archive
          </p>
          <h1 className="horror-font horror-title max-w-2xl text-3xl leading-[1.05] text-white md:text-5xl">Explore the Unexplained. Document the Unknown.</h1>
          <p className="case-font max-w-2xl text-zinc-300">A cursed archive of case files, witness confessions, and eerie investigations — unsettling, cinematic, and still professional.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/cases" className="button-haunt inline-flex items-center gap-2 rounded-lg border border-ghost/40 bg-ghost/10 px-5 py-2 text-sm text-ghost glow-green transition hover:bg-ghost/20">
              Enter the Archive <ArrowRight size={16} />
            </Link>
            <Link to="/submit-report" className="button-haunt rounded-lg border border-blood/40 bg-blood/10 px-5 py-2 text-sm text-blood glow-red transition hover:bg-blood/20">Report a Haunting</Link>
          </div>

          <div className="grid gap-2 pt-3 md:grid-cols-3">
            <div className="paper-card rounded-2xl p-3 text-xs text-zinc-200"><Activity size={14} className="mb-2 text-ghost" /> Live case ingestion via API</div>
            <div className="paper-card rounded-2xl p-3 text-xs text-zinc-200"><Radar size={14} className="mb-2 text-arcane" /> Narrative and archive sync</div>
            <div className="paper-card rounded-2xl p-3 text-xs text-zinc-200"><ShieldAlert size={14} className="mb-2 text-blood" /> Auth-protected submissions</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Total Files', stats.total],
          ['Solved', stats.solved],
          ['Unsolved', stats.unsolved],
          ['Reports Submitted', stats.reports],
        ].map(([label, value]) => (
          <div key={label} className="paper-card hover-shake rounded-2xl p-5 transition">
            <p className="case-font text-[10px] uppercase tracking-[0.35em] text-zinc-400">{label}</p>
            <p className="blood-title mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="horror-font blood-title text-2xl font-semibold">Featured Cases</h2>
        {loading ? <LoadingSkeleton /> : error ? <ErrorMessage message={error} /> : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((item) => <CaseCard key={item.id} item={item} type="case" />)}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="horror-font blood-title text-2xl font-semibold">Recent Investigations</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recent.map((item) => <CaseCard key={`${item.kind}-${item.id}`} item={item} type={item.kind} />)}
        </div>
      </section>

      <section className="paper-card scratched-border rounded-3xl p-8">
        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold"><Sparkles size={18} className="text-ghost" /> About This Archive</h3>
        <p className="case-font text-zinc-200">This interface is wired to live backend endpoints for authentication, archive reads, and authenticated report submission. Case file schema currently exposes title/body records, with extended evidence timeline fields ready when backend expands.</p>
      </section>
    </div>
  )
}

export default Home
