const SelectInput = ({ label, children, ...props }) => (
  <label className="block space-y-1">
    <span className="case-font text-xs uppercase tracking-[0.22em] text-zinc-300">{label}</span>
    <select
      {...props}
      className="w-full rounded-lg border border-white/10 bg-[rgba(12,8,9,0.92)] px-3 py-2 text-sm text-white outline-none transition focus:border-arcane/60 focus:shadow-[0_0_0_1px_rgba(109,40,217,0.18),0_0_18px_rgba(109,40,217,0.12)]"
    >
      {children}
    </select>
  </label>
)

export default SelectInput
