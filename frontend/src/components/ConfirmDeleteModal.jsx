import Modal from './Modal'

const ConfirmDeleteModal = ({ open, onClose, onConfirm, loading }) => (
  <Modal open={open} onClose={onClose} title="Confirm deletion">
    <p className="case-font mb-4 text-sm text-zinc-300">This record will be erased from the archive. This action cannot be undone.</p>
    <div className="flex justify-end gap-2">
      <button onClick={onClose} className="button-haunt rounded-lg border border-white/10 px-3 py-1.5 text-sm text-zinc-200">Cancel</button>
      <button disabled={loading} onClick={onConfirm} className="button-haunt rounded-lg border border-blood/40 bg-blood/10 px-3 py-1.5 text-sm text-red-200 glow-red">Delete</button>
    </div>
  </Modal>
)

export default ConfirmDeleteModal
