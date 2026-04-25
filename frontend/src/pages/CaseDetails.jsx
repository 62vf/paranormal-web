import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { caseApi } from '../api/caseApi'
import { normalizeItem } from '../utils/helpers'
import StatusBadge from '../components/StatusBadge'
import EvidenceGallery from '../components/EvidenceGallery'
import CaseCard from '../components/CaseCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const CaseDetails = () => {
  const { kind, id } = useParams()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const list = kind === 'fiction' ? await caseApi.getFictions() : await caseApi.getCases()
        const found = await caseApi.getById(id, kind)
        if (!found) throw new Error('Not found')
        setItem(normalizeItem(found, kind))
        setRelated(
          list
            .filter((entry) => entry._id !== id)
            .slice(0, 3)
            .map((entry) => ({ ...normalizeItem(entry, kind), kind })),
        )
      } catch {
        setError('Case file not found or unavailable.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [kind, id])

  const evidenceItems = useMemo(
    () => [
      { id: 'e-1', label: 'Field Log Snapshot', meta: 'Awaiting backend evidence endpoint' },
      { id: 'e-2', label: 'Audio Spectrogram', meta: 'Awaiting backend evidence endpoint' },
      { id: 'e-3', label: 'Thermal Frame', meta: 'Awaiting backend evidence endpoint' },
    ],
    [],
  )

  if (loading) return <LoadingSpinner label="Opening case file..." />
  if (error) return <ErrorMessage message={error} />
  if (!item) return <LoadingSpinner label="Loading case data..." />

  const onShare = async () => {
    const shareText = `${item.title} · ${window.location.href}`
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.body, url: window.location.href })
        return
      } catch {
        // fallback below
      }
    }
    await navigator.clipboard.writeText(shareText)
    toast.success('Case file link copied to clipboard')
  }

  return (
    <div className="relative min-h-screen space-y-8 horror-panel p-4 md:p-8">
      <section className="paper-card scratched-border space-y-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-dashed border-blood/50 pb-4">
          <div>
            <h1 className="horror-font blood-title text-4xl md:text-5xl font-bold">
              {item.title}
            </h1>
            <p className="case-font text-sm text-zinc-400 mt-1">
              Case File #{item.id.slice(-6)}
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <StatusBadge status={item.status} />
            <button onClick={onShare} className="horror-button-sm">
              Share
            </button>
          </div>
        </div>

        <div className="prose prose-invert prose-p:case-font prose-p:text-zinc-200 prose-p:text-lg">
          <p>{item.body}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="paper-card-darker scratched-border p-4 space-y-2">
            <h3 className="case-font text-xl font-semibold text-white flex items-center gap-2">
              <span className="text-2xl">📋</span> Investigation Notes
            </h3>
            <p className="case-font text-sm text-zinc-300">
              <strong className="text-zinc-100">Case Type:</strong> {item.caseType}
            </p>
            <p className="case-font text-sm text-zinc-300">
              <strong className="text-zinc-100">Location:</strong> {item.location}
            </p>
          </div>
          <div className="paper-card-darker scratched-border p-4 space-y-2">
            <h3 className="case-font text-xl font-semibold text-white flex items-center gap-2">
              <span className="text-2xl">⏳</span> Timeline
            </h3>
            <p className="case-font text-sm text-zinc-300">
              Field chronology is currently condensed into the case narrative because backend schema
              currently stores title and body only.
            </p>
          </div>
        </div>

        <div className="paper-card-darker scratched-border p-4">
          <h3 className="case-font text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">📸</span> Evidence Gallery
          </h3>
          <EvidenceGallery items={evidenceItems} />
        </div>

        <div className="paper-card-darker scratched-border p-4">
          <h3 className="case-font text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">🗣️</span> Witness Statements
          </h3>
          <p className="case-font text-sm text-zinc-300">
            Dedicated witness statement fields are not exposed by the backend yet. Narrative
            evidence is preserved in the core report body.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-dashed border-blood/50">
          <h3 className="horror-font blood-title text-2xl font-semibold">Related Case Files</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((entry) => (
              <CaseCard key={`${entry.kind}-${entry.id}`} item={entry} type={entry.kind} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseDetails
