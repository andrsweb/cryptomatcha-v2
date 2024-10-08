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
// Components
import Spinner from '../../spinners/Spinner'
// Store
import useStore from '../../../../store/store'
// Icons
import { FaCopy } from "react-icons/fa"
import { FaRegUser } from "react-icons/fa"
import { RiLogoutBoxRLine } from "react-icons/ri"

const WalletButton = ({ chainName }: { chainName: string }) => {
    const { connect, isWalletConnected, address, disconnect } = useChain(chainName)
    const [balance, setBalance] = useState<number>(0)
    const [isFetchingBalance, setFetchingBalance] = useState<boolean>(true)
    const [isConnecting, setIsConnecting] = useState<boolean>(false)

    const { setAddress, setStatus } = useStore()

    useEffect(() => {
        const storedAddress = sessionStorage.getItem('address')
        const storedStatus = sessionStorage.getItem('status') as 'Connected' | 'Disconnected' | null

        if (storedAddress) {
            setAddress(storedAddress)
        }
        if (storedStatus) {
            setStatus(storedStatus)
        }
    }, [setAddress, setStatus])

    const handleConnect = async () => {
        if (!isWalletConnected) {
            setIsConnecting(true)
            try {
                await connect()
                if (address) {
                    await fetchBalance()
                    setAddress(address)
                    setStatus('Connected')
                    sessionStorage.setItem('address', address)
                    sessionStorage.setItem('status', 'Connected')
                }
            } catch (error) {
                console.error("Connection error:", error)
            } finally {
                setIsConnecting(false)
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
            fetchBalance().then(() => setFetchingBalance(false))
            setAddress(address)
            setStatus('Connected')
            sessionStorage.setItem('address', address)
            sessionStorage.setItem('status', 'Connected')
        } else {
            setFetchingBalance(false)
        }
    }, [isWalletConnected, address, setAddress, setStatus])

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
            {(isFetchingBalance || isConnecting) ? (
                <button className='wallet-button' disabled>
                    <Spinner />
                    <span>Connecting...</span>
                </button>
            ) : isWalletConnected ? (
                <div className="wallet-button-inner">
                    <div className="wallet-button-info">
                        <div className="address" onClick={copyAddressToClipboard}>
                            {address ? formatAddress(address) : "Error fetch address"} <FaCopy />
                        </div>
                        <div className="balance-wrapper">
                            <div className='balance'>{balance.toFixed(2)} stars</div>
                        </div>
                    </div>
                    
                    <button className='disconnect-button' onClick={() => {
                        disconnect()
                        setAddress(null)
                        setStatus('Disconnected')
                        sessionStorage.removeItem('address')
                        sessionStorage.removeItem('status')
                    }}>
                        <span>Disconnect</span><RiLogoutBoxRLine />
                    </button>
                    {address && (
                        <Link to="/user-dashboard" className="user-button">
                            <FaRegUser />
                        </Link>
                    )}
                </div>
            ) : (
                <button className='wallet-button' onClick={handleConnect} disabled={isConnecting}>
                    <span>Connect Wallet</span>
                </button>
            )}
        </div>
    )
}

export default WalletButton
