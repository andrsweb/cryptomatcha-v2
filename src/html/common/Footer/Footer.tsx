// Libs
import { Link } from 'react-router-dom'
// Styles
import './Footer.scss'
// Images
import cat1 from '../../../assets/svg/cats/grey-cat-stay.svg'
import cat2 from '../../../assets/svg/cats/grey-cat-meow.svg'
import bigCat from '../../../assets/svg/cats/big-orange-cat.svg'
import { RxDiscordLogo } from "react-icons/rx"
import { BsTwitterX } from "react-icons/bs"
import { PiTelegramLogo } from "react-icons/pi"
import stars from '../../../assets/img/footer/stargaze-gradient.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
				<div className="footer-title">
					STAY BORED! 
				</div>
                <div className="footer-wrapper">
					<div className="footer-info">
						<p>
							Join our email list for promotions, giveaways, and other communications from the Cryptomatcha.
						</p>
						<div className="footer-socials">
							<a href="#" className='social' target='_blank'>
								<PiTelegramLogo />
							</a>
							<a href="#">
								<BsTwitterX />
							</a>
							<a href="#">
								<RxDiscordLogo />
								<img className='cat1' src={cat1} alt="" />
							</a>
						</div>
					</div>
					<div className="footer-menu-bottom">	
						<nav>
							<ul>
								<li className='cat2'>
									<img src={cat2} alt="" />
								</li>
								<li>
									<Link to="/">
										NEWS
									</Link>
								</li>
								<li>
									<Link to="/">
										PARTNERSHIPS
									</Link>
								</li>
								<li>
									<Link to="/">
										COLLECTIONS
									</Link>
								</li>
								<li>
									<Link to="/">
										ABOUT US
									</Link>
								</li>
								<li>
									<Link to="/">
										APPS
									</Link>
								</li>
							</ul>
						</nav>
						<div className="footer-menu-bottom-img">
							<img src={bigCat} alt="" />
						</div>
						<div className="footer-rights">
							© 2024 CRYPTOMATCHA
						</div>
					</div>
                </div>
            </div>
			<div className="falling-logos">
                <div className="stars"><img src={stars} alt="" /></div>
                <div className="stars"><img src={stars} alt="" /></div>
                <div className="stars"><img src={stars} alt="" /></div>
                <div className="stars"><img src={stars} alt="" /></div>
                <div className="stars"><img src={stars} alt="" /></div>
            </div>
        </footer>
    )
}

export default Footer
