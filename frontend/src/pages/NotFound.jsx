import { Link } from 'react-router-dom'

const NotFound = () => (
  <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="mt-2 text-zinc-400">The requested file has vanished into the void.</p>
    <Link to="/" className="mt-5 inline-block rounded-lg bg-ghost/20 px-4 py-2 text-sm text-ghost ring-1 ring-ghost/40">Return to archive</Link>
  </section>
)

export default NotFound
