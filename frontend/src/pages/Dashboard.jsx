import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { caseApi } from '../api/caseApi'
import { normalizeItem } from '../utils/helpers'
import AdminSidebar from '../components/AdminSidebar'
import FormInput from '../components/FormInput'
import TextArea from '../components/TextArea'
import Modal from '../components/Modal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [cases, setCases] = useState([])
  const [fictions, setFictions] = useState([])
  const [activeTab, setActiveTab] = useState('case')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ title: '', body: '' })

  const load = async () => {
    setLoading(true)
    try {
      const [caseRows, fictionRows] = await Promise.all([caseApi.getCases(), caseApi.getFictions()])
      setCases(caseRows.map((x) => normalizeItem(x, 'case')))
      setFictions(fictionRows.map((x) => normalizeItem(x, 'fiction')))
    } catch {
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const stats = useMemo(() => ({
    cases: cases.length,
    stories: fictions.length,
    total: cases.length + fictions.length,
  }), [cases, fictions])

  const records = activeTab === 'case' ? cases : fictions

  const openEdit = (record, kind) => {
    setSelected({ ...record, kind })
    setForm({ title: record.title, body: record.body })
    setEditModalOpen(true)
  }

  const openDelete = (record, kind) => {
    setSelected({ ...record, kind })
    setDeleteModalOpen(true)
  }

  const onEditSave = async () => {
    if (!selected) return
    try {
      if (selected.kind === 'fiction') {
        await caseApi.updateFiction(selected.id, form)
      } else {
        await caseApi.updateCase(selected.id, form)
      }
      toast.success('Record updated')
      setEditModalOpen(false)
      await load()
    } catch {
      toast.error('Update failed')
    }
  }

  const onDelete = async () => {
    if (!selected) return
    try {
      if (selected.kind === 'fiction') {
        await caseApi.deleteFiction(selected.id)
      } else {
        await caseApi.deleteCase(selected.id)
      }
      toast.success('Record deleted')
      setDeleteModalOpen(false)
      await load()
    } catch {
      toast.error('Delete failed')
    }
  }

  if (loading) return <LoadingSpinner label="Loading admin dashboard..." />

  return (
    <div className="relative min-h-screen space-y-8">
      <section className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <AdminSidebar />

        <div className="space-y-8">
          <div className="text-center border-b border-dashed border-blood/40 pb-6">
            <h1 className="horror-font blood-title text-5xl font-bold">Investigation Control Room</h1>
            <p className="case-font mt-2 text-zinc-400">Manage all paranormal cases and fictional stories</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="paper-card-darker scratched-border p-6 text-center hover:shadow-[0_0_30px_rgba(139,0,0,0.2)] transition-all duration-300">
              <p className="case-font text-sm text-zinc-400 uppercase tracking-widest">Total Artifacts</p>
              <p className="blood-title text-4xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="paper-card-darker scratched-border p-6 text-center hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] transition-all duration-300">
              <p className="case-font text-sm text-ghost uppercase tracking-widest">Case Files</p>
              <p className="ghost-title text-4xl font-bold mt-2">{stats.cases}</p>
            </div>
            <div className="paper-card-darker scratched-border p-6 text-center hover:shadow-[0_0_30px_rgba(109,40,217,0.2)] transition-all duration-300">
              <p className="case-font text-sm text-arcane uppercase tracking-widest">Stories</p>
              <p className="arcane-title text-4xl font-bold mt-2">{stats.stories}</p>
            </div>
          </div>

          <div className="paper-card scratched-border p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-white/10 pb-4">
              <h2 className="horror-font text-2xl font-semibold text-white tracking-wide">Archive Inventory</h2>
              <div className="rounded-xl border border-white/10 bg-black/40 p-2 flex gap-2">
                <button
                  onClick={() => setActiveTab('case')}
                  className={`rounded-lg px-4 py-2 font-bold transition-all duration-300 ${
                    activeTab === 'case' 
                      ? 'bg-ghost/30 text-ghost glow-green shadow-[0_0_15px_rgba(57,255,20,0.3)]' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📋 Cases
                </button>
                <button
                  onClick={() => setActiveTab('fiction')}
                  className={`rounded-lg px-4 py-2 font-bold transition-all duration-300 ${
                    activeTab === 'fiction' 
                      ? 'bg-arcane/30 text-violet-100 glow-purple shadow-[0_0_15px_rgba(109,40,217,0.3)]' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📚 Stories
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
              {records.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/10 bg-black/20 p-6 text-center case-font text-zinc-400">
                  No {activeTab} records in archive yet.
                </div>
              )}

              {records.map((record) => (
                <div 
                  key={record.id} 
                  className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/40 p-4 hover:bg-black/60 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] sm:flex-row sm:items-center sm:justify-between group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="case-font font-bold text-white truncate group-hover:text-ghost transition-colors">{record.title}</p>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{record.body.slice(0, 85)}...</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEdit(record, activeTab)}
                      className="horror-button-sm text-xs px-3 py-2"
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => openDelete(record, activeTab)}
                      className="horror-button-sm bg-blood/20 text-red-300 border-blood/40 text-xs px-3 py-2 hover:bg-blood/30"
                    >
                      ✕ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit archive record">
        <div className="space-y-4">
          <FormInput
            label="Title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <TextArea
            label="Description"
            rows={6}
            value={form.body}
            onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
          />
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setEditModalOpen(false)} className="horror-button-sm text-zinc-300">Cancel</button>
            <button onClick={onEditSave} className="horror-button-sm bg-ghost/20 text-ghost border-ghost/40">Save Changes</button>
          </div>
        </div>
      </Modal>

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDelete}
      />
    </div>
  )
}

export default Dashboard
