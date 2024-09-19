import { useState } from 'react'
import { toast } from 'react-toastify'
import './DiscordTabs.scss'

interface DiscordAddProps {
    onAddSuccess: () => void
}

const DiscordAdd = ({ onAddSuccess }: DiscordAddProps) => {
    const [floorPriceAddress, setFloorPriceAddress] = useState<string>('')
    const [floorPriceChannelId, setFloorPriceChannelId] = useState<string>('')
    const [floorPriceCollectionName, setFloorPriceCollectionName] = useState<string>('')

    const [highestOfferAddress, setHighestOfferAddress] = useState<string>('')
    const [highestOfferChannelId, setHighestOfferChannelId] = useState<string>('')
    const [highestOfferCollectionName, setHighestOfferCollectionName] = useState<string>('')

    const [tokenCountAddress, setTokenCountAddress] = useState<string>('')
    const [tokenCountChannelId, setTokenCountChannelId] = useState<string>('')
    const [tokenCountCollectionName, setTokenCountCollectionName] = useState<string>('')

    const apiBaseUrl = 'https://ffb671a86d02.vps.myjino.ru/discord'

    const handleAdd = async (
        endpoint: string,
        address: string,
        channelId: string,
        collectionName: string,
        setAddress: React.Dispatch<React.SetStateAction<string>>,
        setChannelId: React.Dispatch<React.SetStateAction<string>>,
        setCollectionName: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        try {
            console.log('Sending data:', { collection_address: address, chat_id: channelId, collection_name: collectionName })
    
            const response = await fetch(`${apiBaseUrl}/${endpoint}/add`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ collection_address: address, chat_id: channelId, collection_name: collectionName }),
            })
    
            if (!response.ok) {
                throw new Error('Failed to add address and chat ID')
            }
    
            toast.success('Successfully added address, Channel ID, and collection name!')
            onAddSuccess()
            setAddress('')
            setChannelId('')
            setCollectionName('')
        } catch (err) {
            toast.error((err as Error).message)
        }
    }

    return (
        <div className="discord-info-tabs">
            <div className="discord-info-tab">
                <h4>Floor Price Data</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleAdd('collection-floor', floorPriceAddress, floorPriceChannelId, floorPriceCollectionName, setFloorPriceAddress, setFloorPriceChannelId, setFloorPriceCollectionName) }}>
                    <div className="input-wrapper">
                        <label htmlFor="floor-price-collection-name">Collection Name</label>
                        <input
                            id="floor-price-collection-name"
                            type="text"
                            value={floorPriceCollectionName}
                            onChange={(e) => setFloorPriceCollectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="floor-price-address">NFT Address</label>
                        <input
                            id="floor-price-address"
                            type="text"
                            value={floorPriceAddress}
                            onChange={(e) => setFloorPriceAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="floor-price-channel-id">Channel ID</label>
                        <input
                            id="floor-price-channel-id"
                            type="text"
                            value={floorPriceChannelId}
                            onChange={(e) => setFloorPriceChannelId(e.target.value)}
                            required
                        />
                    </div>
                    <button className='submit-button' type="submit">Add Floor Price</button>
                </form>

                <h4>Highest Offer Data</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleAdd('highest-offer', highestOfferAddress, highestOfferChannelId, highestOfferCollectionName, setHighestOfferAddress, setHighestOfferChannelId, setHighestOfferCollectionName) }}>
                    <div className="input-wrapper">
                        <label htmlFor="highest-offer-collection-name">Collection Name</label>
                        <input
                            id="highest-offer-collection-name"
                            type="text"
                            value={highestOfferCollectionName}
                            onChange={(e) => setHighestOfferCollectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="highest-offer-address">NFT Address</label>
                        <input
                            id="highest-offer-address"
                            type="text"
                            value={highestOfferAddress}
                            onChange={(e) => setHighestOfferAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="highest-offer-channel-id">Channel ID</label>
                        <input
                            id="highest-offer-channel-id"
                            type="text"
                            value={highestOfferChannelId}
                            onChange={(e) => setHighestOfferChannelId(e.target.value)}
                            required
                        />
                    </div>
                    <button className='submit-button' type="submit">Add Highest Offer</button>
                </form>

                <h4>Token Count Data</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleAdd('token-count', tokenCountAddress, tokenCountChannelId, tokenCountCollectionName, setTokenCountAddress, setTokenCountChannelId, setTokenCountCollectionName) }}>
                    <div className="input-wrapper">
                        <label htmlFor="token-count-collection-name">Collection Name</label>
                        <input
                            id="token-count-collection-name"
                            type="text"
                            value={tokenCountCollectionName}
                            onChange={(e) => setTokenCountCollectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="token-count-address">NFT Address</label>
                        <input
                            id="token-count-address"
                            type="text"
                            value={tokenCountAddress}
                            onChange={(e) => setTokenCountAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="token-count-channel-id">Channel ID</label>
                        <input
                            id="token-count-channel-id"
                            type="text"
                            value={tokenCountChannelId}
                            onChange={(e) => setTokenCountChannelId(e.target.value)}
                            required
                        />
                    </div>
                    <button className='submit-button' type="submit">Add Token Count</button>
                </form>
            </div>
        </div>
    )
}

export default DiscordAdd