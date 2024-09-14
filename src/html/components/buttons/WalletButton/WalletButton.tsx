// Styles
import './WalletButton.scss'
// Libs
import { useEffect, useState } from "react"
import { useChain } from "@cosmos-kit/react"
import { SigningStargateClient } from "@cosmjs/stargate"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
// Constants
import { RPC_ENDPOINT } from "../../../../global/constants"
// Functions
import { formatAddress } from "../../../common/Header/functions"
// Icons
import { FaCopy } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc";

const WalletButton = ({ chainName }: { chainName: string }) => {
    const { connect, isWalletConnected, address, disconnect } = useChain(chainName)
    const [balance, setBalance] = useState<number>(0)
    const [isFetchingBalance, setFetchingBalance] = useState<boolean>(false)
    const [isConnecting, setIsConnecting] = useState<boolean>(false) // Добавлено состояние для лоадера подключения

    const handleConnect = async () => {
        if (!isWalletConnected) {
            setIsConnecting(true) // Запускаем лоадер перед подключением
            try {
                await connect()
                if (address) {
                    fetchBalance()
                }
            } catch (error) {
                console.error("Connection error:", error)
            } finally {
                setIsConnecting(false) // Останавливаем лоадер после подключения
            }
        }
    }

    const fetchBalance = async () => {
        if (!address) return

        setFetchingBalance(true)

        try {
            const client = await SigningStargateClient.connect(RPC_ENDPOINT)

            const balances = await client.getAllBalances(address)

            const starBalance = balances.find(c => c.denom === "ustars")

            if (starBalance) {
                const amountInUnits = parseInt(starBalance.amount) / 1000000
                setBalance(amountInUnits)
            } else {
                setBalance(0)
            }
        } catch (error) {
            console.error("Error fetching balance:", error)
            setBalance(0)
        }

        setFetchingBalance(false)
    }

    useEffect(() => {
        if (isWalletConnected && address) {
            fetchBalance()
        }
    }, [isWalletConnected, address])

    const copyAddressToClipboard = async () => {
        if (address) {
            try {
                await navigator.clipboard.writeText(address)
                toast('🐹 Address copied!')
            } catch (err) {
                console.error('Failed to copy address: ', err)
                toast.error('Failed to copy address.')
            }
        }
    }

    return (
        <div className='wallet-button-wrapper'>
            {isWalletConnected ? (
                <div className="wallet-button-inner">
                    <div className="wallet-button-info">
                        <div className="address" onClick={copyAddressToClipboard}>
                            {address ? formatAddress(address) : "Error fetch address"} <FaCopy />
                        </div>
                        <div className="balance-wrapper">
                            {isFetchingBalance ? (
                                <div className='loader'></div>
                            ): (
                                <div className='balance'>{balance.toFixed(2)} stars</div>
                            )}
                        </div>
                    </div>
                    
                    <button className='disconnect-button' onClick={() => disconnect()}>Disconnect</button>
                    {address && (
                        <Link to="/user-dashboard" className="user-button">
                            <VscAccount />
                        </Link>
                    )}
                </div>
            ) : (
                <button className='wallet-button' onClick={handleConnect} disabled={isConnecting}>
                    {isConnecting ? 'Loading...' : 'Connect Wallet'}
                </button>
            )}
        </div>
    )
}

export default WalletButton
