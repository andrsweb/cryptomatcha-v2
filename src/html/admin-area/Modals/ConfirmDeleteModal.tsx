import { useEffect } from 'react'
import { toggleBodyScroll } from '../../../global/functions'

interface ConfirmDeleteModalProps {
    onConfirm: () => void
    onCancel: () => void
    isOpen: boolean
}

const ConfirmDeleteModal = ({ onConfirm, onCancel, isOpen }: ConfirmDeleteModalProps) => {

    useEffect(() => {
        toggleBodyScroll(isOpen)
        return () => toggleBodyScroll(false)
    }, [isOpen])

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onCancel()
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal open" onClick={handleOverlayClick}>
            <div className="modal-content open">
                <h4>Are you sure?</h4>
                <p>Do you really want to delete this post? This process cannot be undone.</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>Yes, Delete</button>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal