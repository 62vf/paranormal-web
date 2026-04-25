import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

const Register = () => {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
      toast.success('Registration complete')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center p-4">
      <div className="pointer-events-none absolute inset-0 bg-cover opacity-10 blur-sm" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')" }}></div>
      <section className="paper-card-darker scratched-border relative z-10 w-full max-w-md p-8 shadow-[0_0_60px_rgba(109,40,217,0.15)] glow-purple">
        <div className="text-center mb-8 border-b border-dashed border-arcane/30 pb-4">
          <h1 className="horror-font arcane-title text-4xl font-bold tracking-widest">Join Society</h1>
          <p className="case-font mt-2 text-zinc-400 text-sm">Swear the oath and enter the investigation archive.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-black/60 p-4 rounded-lg border border-white/5">
            <FormInput name="username" required label="Alias Calling" placeholder="nightwatcher" value={form.username} onChange={onChange} />
          </div>
          <div className="bg-black/60 p-4 rounded-lg border border-white/5">
            <FormInput name="email" type="email" required label="Direct Contact" placeholder="specter@archive.org" value={form.email} onChange={onChange} />
          </div>
          <div className="bg-black/60 p-4 rounded-lg border border-white/5">
            <FormInput name="password" type="password" required label="Forbidden Syllables" placeholder="•••••••••" value={form.password} onChange={onChange} />
          </div>

          <button 
            disabled={loading} 
            className="horror-button-purple w-full text-xl mt-4 py-3"
          >
            {loading ? 'Binding Contract...' : 'Swear the Oath'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm case-font border-t border-dashed border-arcane/30 pt-4">
          <span className="text-zinc-500">Already initiated? </span>
          <Link to="/login" className="text-arcane hover:text-white transition-colors font-bold tracking-wider">Access Portal</Link>
        </div>
      </section>
    </div>
  )
}

export default Register
