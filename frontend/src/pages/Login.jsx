import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

const Login = () => {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form)
      toast.success('Welcome back investigator')
      navigate(location.state?.from || '/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center p-4">
      <div className="pointer-events-none absolute inset-0 bg-cover opacity-10 blur-sm" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')" }}></div>
      <section className="paper-card-darker scratched-border relative z-10 w-full max-w-md p-8 shadow-[0_0_60px_rgba(57,255,20,0.1)] glow-green">
        <div className="text-center mb-8 border-b border-dashed border-ghost/30 pb-4">
          <h1 className="horror-font ghost-title text-4xl font-bold tracking-widest">Portal Access</h1>
          <p className="case-font mt-2 text-zinc-400 text-sm">Enter your credentials to access the classified archives.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-black/60 p-4 rounded-lg border border-white/5">
            <FormInput name="email" type="email" required label="Investigator Email" placeholder="specter@archive.org" value={form.email} onChange={onChange} />
          </div>
          <div className="bg-black/60 p-4 rounded-lg border border-white/5">
            <FormInput name="password" type="password" required label="Secret Passcode" placeholder="•••••••••" value={form.password} onChange={onChange} />
          </div>
          
          <button 
            disabled={loading} 
            className="horror-button w-full"
          >
            {loading ? 'Authenticating Aura...' : 'Unlock Portal'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm case-font border-t border-dashed border-ghost/30 pt-4">
          <span className="text-zinc-500">Not initiated? </span>
          <Link to="/register" className="text-ghost hover:text-white transition-colors duration-300 font-bold tracking-wider">Join the Society</Link>
        </div>
      </section>
    </div>
  )
}

export default Login
