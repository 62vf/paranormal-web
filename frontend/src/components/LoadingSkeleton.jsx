const LoadingSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="paper-card h-52 rounded-2xl" />
    ))}
  </div>
)

export default LoadingSkeleton
