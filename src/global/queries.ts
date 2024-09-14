import { gql } from "@apollo/client"

export const GET_WALLET_STATS = gql`
  query Stats($address: String!) {
    wallet(address: $address) {
      stats {
        buyVolumeUsd
        numBuys
        numMints
        numSells
        numTrades
        sellVolumeUsd
        totalRealizedUsdProfit
        totalUnrealizedUsdProfit
        totalValueUsd
        totalVolumeUsd
      }
    }
  }
`

export const GET_TOKENS = gql`
  query Tokens($collectionAddr: String, $ownerAddrOrName: String, $sortBy: TokenSort, $limit: Int, $offset: Int) {
    tokens(collectionAddr: $collectionAddr, ownerAddrOrName: $ownerAddrOrName, sortBy: $sortBy, limit: $limit, offset: $offset) {
      tokens {
        media {
          visualAssets {
            xl {
              staticUrl
            }
          }
        }
        rarityOrder
        name
      }
      pageInfo {
        limit
        offset
        total
      }
    }
  }
`