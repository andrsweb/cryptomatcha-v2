import { useCallback } from "react"
import { GET_TOKENS } from "../../../global/queries"
import { TokensResponse, TokenData } from "./types"
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPHQL_URL } from '../../../global/constants'

export const client = new ApolloClient({
	uri: GRAPHQL_URL,
	cache: new InMemoryCache(),
})

export const fetchTokenData = useCallback(
	(collectionAddr: string, page: number, setTokenData: React.Dispatch<React.SetStateAction<{ tokens: TokenData[]; total: number }>>) => {
		client
			.query<TokensResponse>({
				query: GET_TOKENS,
				variables: {
					ownerAddrOrName: address,
					collectionAddr: collectionAddr,
					sortBy: 'RARITY_ASC',
					limit: 10,
					offset: page * 10
				},
			})
			.then((response) => {
				const tokens = response.data.tokens.tokens
				const total = response.data.tokens.pageInfo.total
				setTokenData({ tokens, total })
				setLoading(false)
			})
			.catch((error) => {
				console.error('Error fetching token data:', error)
				setLoading(false)
			})
	},
	[address]
)