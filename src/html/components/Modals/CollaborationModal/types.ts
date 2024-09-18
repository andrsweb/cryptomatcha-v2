export interface ModalProps {
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