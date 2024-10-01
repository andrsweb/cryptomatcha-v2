import { useEffect, useState } from 'react'
import { ChainRegistryClient } from '@chain-registry/client'

interface UseChainDataResult {
	chains: any[]
	assets: any[]
	error: string | null
}

const useChainData = (chainNames: string[]): UseChainDataResult => {
	const [chains, setChains] = useState<any[]>([])
	const [assets, setAssets] = useState<any[]>([])
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const client = new ChainRegistryClient({ chainNames })

		const fetchData = async () => {
			try {
				await client.fetchUrls()
				const chainData = client.getChain(chainNames[0])
				const assetListData = client.getChainAssetList(chainNames[0])

				if (chainData && assetListData) {
					setChains([chainData])
					setAssets([assetListData])
				} else {
					throw new Error("Chain data or asset list data is not available.")
				}
			} catch (err) {
				setError("Error loading chain data.")
				console.error(err)
			}
		}

		fetchData()
	}, [chainNames])

	return { chains, assets, error }
}

export default useChainData