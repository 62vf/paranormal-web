const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center py-12">
    <div className="flex items-center gap-4 rounded-full border border-white/10 bg-black/50 px-4 py-3 text-ghost glow-green">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ghost/40 bg-black/70 text-lg animate-spin [animation-duration:2.8s]">
        ✦
      </div>
      <span className="case-font text-sm tracking-[0.18em] text-zinc-200">{label}</span>
    </div>
  </div>
)

export default LoadingSpinner
