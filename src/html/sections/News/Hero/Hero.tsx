import './Hero.scss'
import heroBg from '../../../../assets/svg/bg/hero-bg.svg'
import redCat from '../../../../assets/svg/cats/red-cat.svg'
import greyCat from '../../../../assets/svg/cats/grey-cat.svg'
import { FaArrowDown } from "react-icons/fa6"

const Hero = () => {

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
		const targetId = e.currentTarget.getAttribute("href")?.slice(1)
		const targetElement = document.getElementById(targetId as string)
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop,
				behavior: "smooth"
			})
		}
	}

	return (
		<section className="hero-news">
			<img className='hero-news-bg' src={heroBg} alt="" />
			<div className="container">
				<div className="hero-news-wrapper">
					<div className="hero-news-info">
						<img className='red-cat' src={redCat} alt="" />
						<h1>CRYPTO MATCHA BLOG</h1>
						<p>
							All the latest news from the creative industry – across art, design and visual communication, including big launches, awards ceremonies, new exhibitions and events, interesting announcements and insightful reports.
						</p>
						<img className='grey-cat' src={greyCat} alt="" />
						<a className='button-explore' href="#news-list" onClick={scrollToSection}>
							Explore <FaArrowDown />
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero