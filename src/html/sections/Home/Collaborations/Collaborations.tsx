// Libs
import { useState } from 'react'
// Types
import { CollaborationData } from './types'
// Components
import CollaborationModal from '../../../components/Modals/CollaborationModal/CollaborationModal'
// Styles
import "./Collaborations.scss"
import '../../../../scss/components/blocks/title.scss'
// Images
import shitmos from "../../../../assets/img/home/collaborations/shitmos.jpg"
import smokers from "../../../../assets/img/home/collaborations/smokers.jpeg"
import shade from "../../../../assets/img/home/collaborations/shade.jpg"
import bigCat from '../../../../assets/svg/cats/big-orange-cat.svg'

const Collaborations = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<CollaborationData | null>(null)

    const handleMoreInfoClick = (content: CollaborationData) => {
        setModalContent(content)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setModalContent(null)
    }

    const collaborations: CollaborationData[] = [
        {
            imgSrc: smokers,
            title: "Smoker Club",
            description: "We have many traits in both collections which gives you membership in Smokers Club - a place where you can join rumbles and other games and win nice NFTs. Also, you can soft-stake Smokers NFT on Plstaking to earn SMKR token and join raffles there.",
            discordLink: "#",
            twitterLink: "#",
        },
        {
            imgSrc: shitmos,
            title: "Shitmos Economic Zone",
            description: "We are one of the first collections to join SEZ. 20% of our both collections' royalties go to the SEZ treasury for buybacks of Shitmos - a real community moving memecoin in the whole Cosmos Community is very strong and grows every day.",
            discordLink: "#",
            twitterLink: "#",
        },
        {
            imgSrc: shade,
            title: "Seven Green Shade",
            description: "We are one of the first collections to join SEZ. 20% of our both collections' royalties go to the SEZ treasury for buybacks of Shitmos - a real community moving memecoin in the whole Cosmos Community is very strong and grows every day.",
            discordLink: "#",
            twitterLink: "#",
        },
        {
            imgSrc: shade,
            title: "Seven Green Shade",
            description: "We are one of the first collections to join SEZ. 20% of our both collections' royalties go to the SEZ treasury for buybacks of Shitmos - a real community moving memecoin in the whole Cosmos Community is very strong and grows every day.",
            discordLink: "#",
            twitterLink: "#",
        },
    ]

    return (
        <section className="collaborations">
            <div className="container">
                <h2>
                    Collaborations
                </h2>
                <div className="collaborations-wrapper">
                    {collaborations.map((collab, index) => (
                        <div className="collaborations-card" key={index}>
                            <div className="collaborations-card-cat">
                                <img src={bigCat} alt="" />
                            </div>
                            <div className="collaborations-card-img">
                                <img src={collab.imgSrc} alt="" />
                            </div>
                            <div className="collaborations-card-inner">
                                <div className="collaborations-card-title">
                                    {collab.title}
                                </div>
                                <p>
                                    {collab.description}
                                </p>
                                <div className="collaborations-card-links">
                                    <button className='button' onClick={() => handleMoreInfoClick(collab)}>More Info</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <CollaborationModal show={showModal} onClose={handleCloseModal} content={modalContent} />
        </section>
    )
}

export default Collaborations
