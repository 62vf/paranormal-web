import { useEffect, useMemo, useState } from 'react'
import { caseApi } from '../api/caseApi'
import { normalizeItem } from '../utils/helpers'
import CaseCard from '../components/CaseCard'
import SearchFilters from '../components/SearchFilters'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'

const Cases = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  const pageSize = 9

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [cases, fictions] = await Promise.all([caseApi.getCases(), caseApi.getFictions()])
        const normalized = [
          ...cases.map((x) => ({ ...normalizeItem(x, 'case'), kind: 'case' })),
          ...fictions.map((x) => ({ ...normalizeItem(x, 'fiction'), kind: 'fiction' })),
        ]
        setRows(normalized)
      } catch {
        setError('Unable to load case archive.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filtered = useMemo(() => {
    let data = rows.filter((x) => (`${x.title} ${x.body}`).toLowerCase().includes(search.toLowerCase()))

    if (typeFilter !== 'all') {
      data = data.filter((x) => x.kind === typeFilter)
    }

    if (statusFilter !== 'all') {
      data = data.filter((x) => x.status.toLowerCase() === statusFilter)
    }

    if (locationFilter.trim()) {
      data = data.filter((x) => x.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    if (sort === 'az') {
      data = [...data].sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sort === 'newest') {
      data = [...data].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }

    if (sort === 'oldest') {
      data = [...data].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
    }

    return data
  }, [rows, search, typeFilter, statusFilter, locationFilter, sort])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1)

  return (
    <div className="relative min-h-screen space-y-8 horror-panel p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold horror-font ghost-title">Case Archive</h1>
        <p className="text-lg text-zinc-400 mt-2 case-font">
          Browse the collection of paranormal cases and fictional stories.
        </p>
      </div>

      <SearchFilters
        search={search}
        onSearch={setSearch}
        typeFilter={typeFilter}
        onTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        locationFilter={locationFilter}
        onLocationFilter={setLocationFilter}
        sort={sort}
        onSort={setSort}
      />

      {loading && <LoadingSkeleton count={6} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && filtered.length === 0 && (
        <div className="paper-card text-center p-8 text-2xl case-font text-zinc-300">
          No matching files found in the archive.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginated.map((item) => (
          <CaseCard key={`${item.kind}-${item.id}`} item={item} type={item.kind} />
        ))}
      </div>

      {!loading && !error && filtered.length > pageSize && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((v) => Math.max(v - 1, 1))}
            className="horror-button-sm"
          >
            Previous Page
          </button>
          <span className="font-mono text-sm text-zinc-400">Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((v) => Math.min(v + 1, totalPages))}
            className="horror-button-sm"
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  )
}

export default Cases
