import { useEffect, useMemo, useState } from 'react'
import { caseApi } from '../api/caseApi'
import { useAuth } from '../context/AuthContext'
import { normalizeItem } from '../utils/helpers'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import CaseCard from '../components/CaseCard'

const Profile = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [allItems, setAllItems] = useState([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [cases, fictions] = await Promise.all([caseApi.getCases(), caseApi.getFictions()])
        setAllItems([
          ...cases.map((item) => ({ ...normalizeItem(item, 'case'), kind: 'case' })),
          ...fictions.map((item) => ({ ...normalizeItem(item, 'fiction'), kind: 'fiction' })),
        ])
      } catch {
        setError('Unable to load profile data right now.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const stats = useMemo(() => {
    const solved = allItems.filter((x) => x.status === 'solved').length
    return {
      total: allItems.length,
      solved,
      pending: allItems.length - solved,
    }
  }, [allItems])

  if (loading) return <LoadingSpinner label="Loading profile..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Investigator Profile</h1>
        <p className="mt-2 text-sm text-zinc-300">Email: {user?.email || 'Unknown investigator'}</p>
        <p className="mt-1 text-xs text-zinc-500">Note: backend currently does not expose a dedicated profile endpoint.</p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-zinc-400">Visible Archive Files</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-zinc-400">Solved</p>
            <p className="text-2xl font-semibold text-ecto">{stats.solved}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-zinc-400">Under Investigation</p>
            <p className="text-2xl font-semibold text-arcane">{stats.pending}</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recent Archive Files</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {allItems.slice(0, 3).map((item) => (
            <CaseCard key={`${item.kind}-${item.id}`} item={item} type={item.kind} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Profile
