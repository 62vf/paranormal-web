import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { reportApi } from '../api/reportApi'
import { toErrorMessage } from '../utils/helpers'
import FormInput from '../components/FormInput'
import TextArea from '../components/TextArea'
import SelectInput from '../components/SelectInput'

const SubmitReport = () => {
  const [form, setForm] = useState({ title: '', body: '', type: 'case' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await reportApi.submitReport(form)
      toast.success('Report submitted successfully')
      setForm({ title: '', body: '', type: 'case' })
    } catch (error) {
      toast.error(toErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-10">
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 mix-blend-multiply" />
      
      <section className="paper-card-darker scratched-border relative z-10 w-full max-w-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(139,0,0,0.15)] glow-red transition-all duration-500">
        <div className="text-center mb-8 border-b-2 border-dashed border-blood/40 pb-6">
          <h1 className="horror-font blood-title text-4xl md:text-5xl font-bold">Submit Confession</h1>
          <p className="case-font mt-3 text-lg text-zinc-400">
            Record your haunting experience. The archive demands the truth.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-black/40 p-5 rounded-lg border border-white/5 relative">
            <SelectInput label="Classification Type" name="type" value={form.type} onChange={onChange}>
              <option value="case">Paranormal Case</option>
              <option value="fiction">Fictional Story</option>
            </SelectInput>
          </div>

          <div className="bg-black/40 p-5 rounded-lg border border-white/5 relative">
            <FormInput
              label="Incident Title"
              name="title"
              value={form.title}
              onChange={onChange}
              required
              minLength={3}
              maxLength={120}
              placeholder="e.g., The Weeping Shadows of Blackwood Manor"
            />
          </div>

          <div className="bg-black/40 p-5 rounded-lg border border-white/5 relative">
            <TextArea
              label="Detailed Confession"
              name="body"
              value={form.body}
              onChange={onChange}
              required
              rows={8}
              minLength={15}
              placeholder="Provide a detailed timeline, sensory observations, and any chilling witness notes. Do not leave details out..."
              className="case-font text-lg"
            />
          </div>

          <button 
            disabled={loading} 
            className="horror-button w-full text-xl py-4 mt-4"
          >
            {loading ? 'Sealing the Archive...' : 'Record the Haunting'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default SubmitReport
