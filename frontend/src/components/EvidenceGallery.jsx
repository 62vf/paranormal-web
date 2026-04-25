const EvidenceGallery = ({ items = [], message = 'No evidence files attached yet.' }) => {
  if (!items.length) {
    return <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">{message}</div>
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-white/10 bg-black/40 p-3">
          <div className="mb-2 h-28 rounded-lg bg-zinc-900/80" />
          <p className="text-xs text-zinc-300">{item.label}</p>
          <p className="text-[11px] text-zinc-500">{item.meta}</p>
        </div>
      ))}
    </div>
  )
}

export default EvidenceGallery
