export interface WalletStats {
	buyVolumeUsd: number
	numBuys: number
	numMints: number
	numSells: number
	numTrades: number
	sellVolumeUsd: number
	totalRealizedUsdProfit: number
	totalUnrealizedUsdProfit: number
	totalValueUsd: number
	totalVolumeUsd: number
}

export interface TokenData {
	media: {
		visualAssets: {
			xl: {
				staticUrl: string
			}
		}
	}
	rarityOrder: number
	name: string
}

export interface PageInfo {
	limit: number
	offset: number
	total: number
}

export interface TokensResponse {
	tokens: {
		tokens: TokenData[]
		pageInfo: PageInfo
	}
}