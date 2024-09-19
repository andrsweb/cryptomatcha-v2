import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface CollectionChatItem {
  id: number
  collection_address: string
  chat_id: string
  collection_name: string
}

const DiscordList = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const [floorPriceData, setFloorPriceData] = useState<CollectionChatItem[]>([])
  const [highestOfferData, setHighestOfferData] = useState<CollectionChatItem[]>([])
  const [tokenCountData, setTokenCountData] = useState<CollectionChatItem[]>([])
  
  const [error, setError] = useState<string | null>(null)
  
  const apiBaseUrl = 'https://ffb671a86d02.vps.myjino.ru/discord'
  
  // Fetch data function
  const fetchData = async () => {
    try {
      const [floorPriceResponse, highestOfferResponse, tokenCountResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/collection-floor`),
        fetch(`${apiBaseUrl}/highest-offer`),
        fetch(`${apiBaseUrl}/token-count`)
      ])
      
      if (!floorPriceResponse.ok || !highestOfferResponse.ok || !tokenCountResponse.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const [floorPriceData, highestOfferData, tokenCountData] = await Promise.all([
        floorPriceResponse.json(),
        highestOfferResponse.json(),
        tokenCountResponse.json()
      ])
      
      setFloorPriceData(floorPriceData)
      setHighestOfferData(highestOfferData)
      setTokenCountData(tokenCountData)
    } catch (err) {
      setError((err as Error).message)
      toast.error('Failed to fetch data')
    }
  }
  
  // Fetch data on component mount and when `shouldRefresh` changes
  useEffect(() => {
    fetchData()
  }, [shouldRefresh])
  
  const handleDelete = async (id: number, type: string) => {
    try {
      const url = type === 'collection-floor'
        ? `${apiBaseUrl}/collection-floor/delete`
        : type === 'highest-offer'
        ? `${apiBaseUrl}/highest-offer/delete`
        : `${apiBaseUrl}/token-count/delete`
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete entry')
      }
      
      toast.success('Successfully deleted entry!')
      // Refresh the data after deletion
      fetchData()
    } catch (err) {
      toast.error('Failed to delete entry')
    }
  }
  
  return (
    <div style={{ padding: '20px' }}>
      {error && <p className="error">{error}</p>}
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Floor Price Data</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {floorPriceData.map((item) => (
            <div key={item.id} style={{ flex: '1 1 300px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Collection Name:</strong> {item.collection_name}</p>
              <p><strong>Collection Address:</strong> {item.collection_address}</p>
              <p><strong>Chat ID:</strong> {item.chat_id}</p>
              <button onClick={() => handleDelete(item.id, 'collection-floor')}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Highest Offer Data</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {highestOfferData.map((item) => (
            <div key={item.id} style={{ flex: '1 1 300px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Collection Name:</strong> {item.collection_name}</p>
              <p><strong>Collection Address:</strong> {item.collection_address}</p>
              <p><strong>Chat ID:</strong> {item.chat_id}</p>
              <button onClick={() => handleDelete(item.id, 'highest-offer')}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3>Token Count Data</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {tokenCountData.map((item) => (
            <div key={item.id} style={{ flex: '1 1 300px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Collection Name:</strong> {item.collection_name}</p>
              <p><strong>Collection Address:</strong> {item.collection_address}</p>
              <p><strong>Chat ID:</strong> {item.chat_id}</p>
              <button onClick={() => handleDelete(item.id, 'token-count')}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DiscordList
