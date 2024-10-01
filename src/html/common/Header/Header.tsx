import './Header.scss'
import "@interchain-ui/react/styles"
import { useState, useEffect, useRef } from "react"
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
import useChainData from '../../../hooks/useChainData' 

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const mobileMenuRef = useRef<HTMLDivElement>(null)

	const { chains } = useChainData(['stargaze'])

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
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
		toggleBodyScroll(menuOpen)

		return () => {
			toggleBodyScroll(false)
		}
	}, [menuOpen])

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
