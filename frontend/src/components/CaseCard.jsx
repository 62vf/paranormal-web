import { Link } from 'react-router-dom'
import { FileWarning, FileSearch, Radio } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { formatDate, shortText } from '../utils/helpers'

const iconMap = {
  case: FileSearch,
  fiction: Radio,
}

const CaseCard = ({ item, type = 'case' }) => (
  <article className="group paper-card scratched-border hover-shake horror-cursor p-5 transition">
    <div className="mb-3 flex items-start justify-between gap-3">
      {(() => {
        const Icon = type === 'fiction' ? FileWarning : iconMap[type] || FileSearch
        return (
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blood/40 bg-black/70 text-blood glow-red">
          <Icon size={16} />
        </span>
        <div>
          <p className="case-font text-[10px] uppercase tracking-[0.3em] text-zinc-400">{type === 'fiction' ? 'Narrative Log' : 'Case File'}</p>
          <p className="case-font text-[11px] text-zinc-500">Filed {formatDate(item.createdAt)}</p>
        </div>
      </div>
        )
      })()}
      <StatusBadge status={item.status} />
    </div>
    <h3 className="blood-title mb-2 text-lg font-semibold text-zinc-50">{item.title}</h3>
    <p className="case-font mb-4 text-sm leading-6 text-zinc-300">{shortText(item.body)}</p>
    <div className="mb-4 grid gap-1 text-xs text-zinc-300">
      <p>Type: {item.caseType}</p>
      <p>Location: {item.location}</p>
    </div>
    <Link
      to={`/cases/${type}/${item.id}`}
      className="button-haunt inline-flex rounded-lg border border-ghost/40 bg-ghost/10 px-3 py-2 text-xs text-ghost transition group-hover:bg-ghost/20"
    >
      View Case File
    </Link>
  </article>
)

export default CaseCard
