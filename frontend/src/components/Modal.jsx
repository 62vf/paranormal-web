const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4" onClick={onClose}>
      <div
        className="paper-card scratched-border w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="horror-font text-sm text-white">{title}</h3>
          <button onClick={onClose} className="text-zinc-400 transition hover:text-red-300">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
