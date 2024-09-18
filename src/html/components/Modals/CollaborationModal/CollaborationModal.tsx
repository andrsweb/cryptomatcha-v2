import './CollaborationModal.scss'
import { RxDiscordLogo } from "react-icons/rx"
import { BsTwitterX } from "react-icons/bs"
import { useEffect, useRef } from 'react'
import { toggleBodyScroll } from '../../../../global/functions'

interface ModalProps {
    show: boolean
    onClose: () => void
    content: {
        imgSrc: string
        title: string
        description: string
        discordLink: string
        twitterLink: string
    } | null
}

const CollaborationModal = ({ show, onClose, content }: ModalProps) => {
    const modalWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        toggleBodyScroll(show)

        return () => {
            toggleBodyScroll(false)
        }
    }, [show])

    useEffect(() => {
        if (modalWrapperRef.current) {
            if (show) {
                modalWrapperRef.current.classList.add('showed')
            } else {
                modalWrapperRef.current.classList.remove('showed')
            }
        }
    }, [show])

    if (!show || !content) return null

    const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.currentTarget === event.target) {
            onClose()
        }
    }

    return (
        <div className="modal-wrapper" ref={modalWrapperRef} onClick={handleWrapperClick}>
            <div className="modal">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-img">
                    <img src={content.imgSrc} alt={content.title} />
                </div>
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                <div className="modal-links">
                    <a href={content.discordLink} target="_blank" rel="noopener noreferrer"><RxDiscordLogo /></a>
                    <a href={content.twitterLink} target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
                </div>
            </div>
        </div>
    )
}

export default CollaborationModal
