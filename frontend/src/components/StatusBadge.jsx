const colorByStatus = {
  solved: 'bg-ecto/15 text-ecto border-ecto/40 glow-green',
  unsolved: 'bg-blood/20 text-[#ff9b9b] border-blood/50 glow-red',
  'under investigation': 'bg-arcane/20 text-violet-200 border-arcane/40',
}

const StatusBadge = ({ status = 'under investigation' }) => {
  const value = status.toLowerCase()
  const classes = colorByStatus[value] || colorByStatus['under investigation']

  return (
    <span className={`case-font rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${classes}`}>
      {status}
    </span>
  )
}

export default StatusBadge
