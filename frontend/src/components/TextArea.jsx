const TextArea = ({ label, ...props }) => (
  <label className="block space-y-1">
    <span className="case-font text-xs uppercase tracking-[0.22em] text-zinc-300">{label}</span>
    <textarea
      {...props}
      className="w-full rounded-lg border border-white/10 bg-[rgba(12,8,9,0.92)] px-3 py-2 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-500 focus:border-ghost/50 focus:shadow-[0_0_0_1px_rgba(57,255,20,0.18),0_0_18px_rgba(57,255,20,0.12)]"
    />
  </label>
)

export default TextArea
