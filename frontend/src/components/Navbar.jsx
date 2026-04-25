import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Skull } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const base = ({ isActive }) => `relative text-sm transition hover:text-ghost after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-blood after:via-ghost after:to-transparent after:transition-transform hover:after:scale-x-100 ${isActive ? 'text-ghost after:scale-x-100' : 'text-zinc-300'}`

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const onLogout = async () => {
    try {
      await logout()
      toast.success('Logged out')
      navigate('/login')
      setOpen(false)
    } catch {
      toast.error('Logout failed')
    }
  }

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-ghost">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blood/40 bg-black/70 text-blood glow-red">
            <Skull size={16} />
          </span>
          <span className="horror-font text-sm tracking-[0.22em] text-white md:text-base">Paranormal Archive</span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-4 md:flex">
          <NavLink className={base} to="/cases">Cases</NavLink>
          <NavLink className={base} to="/submit-report">Submit Report</NavLink>
          {isAuthenticated && <NavLink className={base} to="/dashboard">Dashboard</NavLink>}
          {isAuthenticated && <NavLink className={base} to="/profile">Profile</NavLink>}
          {!isAuthenticated ? (
            <>
              <NavLink className={base} to="/login">Login</NavLink>
              <NavLink className="button-haunt rounded-lg border border-ghost/40 bg-ghost/10 px-3 py-1 text-sm text-ghost glow-green" to="/register">
                Register
              </NavLink>
            </>
          ) : (
            <button onClick={onLogout} className="button-haunt rounded-lg border border-blood/40 bg-blood/10 px-3 py-1 text-sm text-blood transition hover:bg-blood/20">
              Logout
            </button>
          )}
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/90 px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <NavLink onClick={closeMenu} className={base} to="/cases">Cases</NavLink>
            <NavLink onClick={closeMenu} className={base} to="/submit-report">Submit Report</NavLink>
            {isAuthenticated && <NavLink onClick={closeMenu} className={base} to="/dashboard">Dashboard</NavLink>}
            {isAuthenticated && <NavLink onClick={closeMenu} className={base} to="/profile">Profile</NavLink>}
            {!isAuthenticated ? (
              <>
                <NavLink onClick={closeMenu} className={base} to="/login">Login</NavLink>
                <NavLink onClick={closeMenu} className={base} to="/register">Register</NavLink>
              </>
            ) : (
              <button onClick={onLogout} className="w-fit rounded-lg border border-blood/40 bg-blood/10 px-3 py-1 text-sm text-blood">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
