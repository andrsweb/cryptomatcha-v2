import './Header.scss'
import "@interchain-ui/react/styles"
import { useState, useEffect, useRef } from "react"
import { ChainRegistryClient } from "@chain-registry/client"
import { Link } from 'react-router-dom'
import { toggleBodyScroll } from '../../../global/functions'
import WalletButton from "../../components/buttons/WalletButton/WalletButton"
import HeaderLogo from './HeaderLogo'
import NavLeft from '../Nav/HeaderNav/NavLeft'
import NavRight from '../Nav/HeaderNav/NavRight'
import BorderLink from "../../components/Links/BorderLink"
import { WINDOW_INNER_WIDTH_XL } from "../../../global/constants"
import { FaBars, FaTimes } from "react-icons/fa"
import logo from '../../../assets/svg/logos/header-logo.svg'

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const client = new ChainRegistryClient({
		chainNames: ['stargaze'],
	})

	const [chains, setChains] = useState<any[]>([])
	const [assets, setAssets] = useState<any[]>([])
	const mobileMenuRef = useRef<HTMLDivElement>(null)

	// Handle scroll to add class when scrolled
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

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
			toggleBodyScroll(true)
		} else {
			toggleBodyScroll(false)
		}

		return () => {
			toggleBodyScroll(false)
		}
	}, [menuOpen])

	if (chains.length === 0 || assets.length === 0) {
		return <div>Loading...</div>
	}

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
			<div className={`mobile-menu ${menuOpen ? 'opened' : ''}`} ref={mobileMenuRef}>
				<BorderLink href="/apps" text="Apps" />
				<Link className='menu-logo' to="/">
					<img src={logo} alt="" />
				</Link>
				<NavLeft />
				<NavRight />
				{chains.length > 0 && <WalletButton chainName={chains[0].chain_name} />}
			</div>
		</header>
	)
}

export default Header