import './Header.scss'
import "@interchain-ui/react/styles"
import { WINDOW_INNER_WIDTH_XL } from "../../../global/constants"
import { useState, useEffect } from "react"
import { ChainProvider } from "@cosmos-kit/react"
import { ThemeProvider } from "@interchain-ui/react"
import { ChainRegistryClient } from "@chain-registry/client"
import { wallets as keplr } from "@cosmos-kit/keplr"
import { wallets as leap } from "@cosmos-kit/leap"
import WalletButton from "../../components/buttons/WalletButton/WalletButton"
import HeaderLogo from './HeaderLogo'
import NavLeft from '../Nav/HeaderNav/NavLeft'
import NavRight from '../Nav/HeaderNav/NavLeft'
import BorderLink from "../../components/Links/BorderLink"
import { sessionOptions } from "./functions"
import { walletConnectOptions } from "./functions"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-router-dom'
import logo from '../../../assets/svg/logos/header-logo.svg'

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const client = new ChainRegistryClient({
		chainNames: ['stargaze'],
	})

	const [chains, setChains] = useState<any[]>([])
	const [assets, setAssets] = useState<any[]>([])

	useEffect(() => {
		(async () => {
			await client.fetchUrls()
			const chainData = client.getChain('stargaze')
			const assetListData = client.getChainAssetList('stargaze')

			setChains([chainData])
			setAssets([assetListData])
		})()

		const handleResize = () => {
			if (window.innerWidth > WINDOW_INNER_WIDTH_XL) {
				setMenuOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add('menu-open')
		} else {
			document.body.classList.remove('menu-open')
		}

		return () => {
			document.body.classList.remove('menu-open')
		}
	}, [menuOpen])

	if (chains.length === 0 || assets.length === 0) {
		return <div>Loading...</div>
	}

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<ThemeProvider
			themeDefs={[
				{
					name: 'custom',
					vars: {
						colors: {
							primary500: '#1a73e8'
						},
						space: {
							sm: '8px',
							lg: '24px'
						}
					},
				}
			]}
			customTheme="custom"
		>
			<ChainProvider
				chains={chains}
				assetLists={assets}
				wallets={[...keplr, ...leap]}
				walletConnectOptions={walletConnectOptions}
				sessionOptions={sessionOptions}
			>
				<header className="header">
					<div className="container">
						<div className="header-wrapper">
							<div className="header-left">
								<BorderLink href="/apps" text="Apps" />
								<NavLeft />
							</div>
							<div className="header-center">
								<HeaderLogo />
							</div>
							<div className="header-right">
								<NavRight />
								{chains.length > 0 && <WalletButton chainName={chains[0].chain_name} />}
							</div>
							<div className="burger-icon" onClick={toggleMenu}>
								{menuOpen ? <FaTimes /> : <FaBars />}
							</div>
						</div>
					</div>
					<div className={`mobile-menu ${menuOpen ? 'opened' : ''}`}>

						<BorderLink href="/apps" text="Apps" />
						<Link className='menu-logo' to="/">
							<img src={logo} alt="" />
						</Link>
						<NavLeft />
						<NavRight />
						{chains.length > 0 && <WalletButton chainName={chains[0].chain_name} />}

					</div>
				</header>
			</ChainProvider>
		</ThemeProvider>
	)
}

export default Header