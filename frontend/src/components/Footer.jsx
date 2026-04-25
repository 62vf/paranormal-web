const Footer = () => (
  <footer className="mt-16 border-t border-white/10 bg-black/55 px-4 py-8 text-center text-xs text-zinc-400">
    <p className="case-font text-zinc-300">Paranormal Research Archive · Investigate responsibly · {new Date().getFullYear()}</p>
    <p className="mt-2 text-[11px] text-zinc-500">Secure archive interface connected to live backend APIs.</p>
  </footer>
)

export default Footer
