import { useState, useEffect, useCallback } from 'react'

import { GET_WALLET_STATS } from '../../../global/queries'
import { WalletStats, TokenData } from './types'
import { client } from './functions'
import { fetchTokenData } from './functions'

const UserDashboard = () => {
	const { address } = useWalletStore()
	const [walletStats, setWalletStats] = useState<WalletStats | null>(null)
	const [tokenData, setTokenData] = useState<{ tokens: TokenData[]; total: number }>({ tokens: [], total: 0 })
	const [secondTokenData, setSecondTokenData] = useState<{ tokens: TokenData[]; total: number }>({ tokens: [], total: 0 })
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(0)
	const [secondPage, setSecondPage] = useState(0)

	useEffect(() => {
		if (address) {

			client
				.query<{ wallet: { stats: WalletStats } }>({
					query: GET_WALLET_STATS,
					variables: { address: address },
				})
				.then((response) => {
					setWalletStats(response.data.wallet.stats)
					setLoading(false)
				})
				.catch((error) => {
					console.error('Error fetching wallet stats:', error)
					setLoading(false)
				})

			fetchTokenData('stars1k7lmdfx2eh5k3dt4jz3uuv4wl6s0tyft2twwjy0mgs3qxs3u3ynssv8dr2', page, setTokenData)
			fetchTokenData('stars1u478mmpm4mv33dkhvt6eryrru3uer6lr5pp8vgt7mhyvxjekx9js9y3kvl', secondPage, setSecondTokenData)
		}
	}, [address, page, secondPage, fetchTokenData])

	const nextPage = () => {
		setPage(page + 1)
		setLoading(true)
	}

	const prevPage = () => {
		if (page > 0) {
			setPage(page - 1)
			setLoading(true)
		}
	}

	const nextSecondPage = () => {
		setSecondPage(secondPage + 1)
		setLoading(true)
	}

	const prevSecondPage = () => {
		if (secondPage > 0) {
			setSecondPage(secondPage - 1)
			setLoading(true)
		}
	}

	if (loading) {
		return 'Loading'
	}

	return (
		<section>
			<div className="wallet-stats">
				<h1>Welcome, hamster!</h1>
				{walletStats ? (
					<div className="user-info">
						<div className="user-info-wrapper">
							<p>Buy Volume (USD): <span>${walletStats.buyVolumeUsd ? walletStats.buyVolumeUsd.toFixed(0) : 'N/A'}</span></p>
							<p>Number of Buys: <span>{walletStats.numBuys}</span></p>
							<p>Number of Mints: <span>{walletStats.numMints}</span></p>
							<p>Number of Sells: <span>{walletStats.numSells}</span></p>
							<p>Number of Trades: <span>{walletStats.numTrades}</span></p>
							<p>Sell Volume (USD): <span>${walletStats.sellVolumeUsd ? walletStats.sellVolumeUsd.toFixed(0) : 'N/A'}</span></p>
							<p>Total Volume (USD): <span>${walletStats.totalVolumeUsd ? walletStats.totalVolumeUsd.toFixed(0) : 'N/A'}</span></p>
						</div>
					</div>
				) : (
					<p>Your wallet is as pristine as a freshly minted NFT!</p>
				)}

				<div className="token-images">
					{tokenData.tokens.length > 0 ? (
						<>
							<div className="user-nfts">
								{tokenData.tokens.map((token, index) => (
									<div className="user-nft" key={index}>
										<img src={token.media.visualAssets.xl.staticUrl} alt={`Token ${index + 1}`} />
										<div className="nft-score">Rarity: <span>{token.rarityOrder.toFixed(0)}</span></div>
										<div className="nft-name">{token.name}</div>
									</div>
								))}
							</div>
							{tokenData.total > 10 && (
								<div className="pagination">
									<button className="pagination-button" onClick={prevPage} disabled={page === 0}>Previous</button>
									<button className="pagination-button" onClick={nextPage} disabled={(page + 1) * 10 >= tokenData.total}>Next</button>
								</div>
							)}
						</>
					) : (
						<p>Hamsters not detected</p>
					)}
				</div>

				<div className="token-images">
					{secondTokenData.tokens.length > 0 ? (
						<>
							<div className="user-nfts">
								{secondTokenData.tokens.map((token, index) => (
									<div className="user-nft" key={index}>
										<img src={token.media.visualAssets.xl.staticUrl} alt={`Token ${index + 1}`} />
										<div className="nft-score">Rarity: <span>{token.rarityOrder.toFixed(0)}</span></div>
										<div className="nft-name">{token.name}</div>
									</div>
								))}
							</div>
							{secondTokenData.total > 2 && (
								<div className="pagination">
									<button className="pagination-button" onClick={prevSecondPage} disabled={secondPage === 0}>Previous</button>
									<button className="pagination-button" onClick={nextSecondPage} disabled={(secondPage + 1) * 10 >= secondTokenData.total}>Next</button>
								</div>
							)}
						</>
					) : (
						<p>Hamsters not detected </p>
					)}
				</div>
			</div>
		</section>
	)
}

export default UserDashboard
