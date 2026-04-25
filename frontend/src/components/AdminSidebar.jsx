import { NavLink } from 'react-router-dom'

const AdminSidebar = () => (
  <aside className="paper-card scratched-border p-4">
    <p className="horror-font mb-3 text-sm text-white">Command Panel</p>
    <div className="space-y-2 text-sm">
      <NavLink className="block rounded-lg px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-ghost" to="/dashboard">Overview</NavLink>
      <NavLink className="block rounded-lg px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-ghost" to="/submit-report">Add Record</NavLink>
      <NavLink className="block rounded-lg px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-ghost" to="/cases">Browse Files</NavLink>
      <NavLink className="block rounded-lg px-2 py-1 text-zinc-300 transition hover:bg-white/10 hover:text-ghost" to="/profile">Profile</NavLink>
    </div>
  </aside>
)

export default AdminSidebar
