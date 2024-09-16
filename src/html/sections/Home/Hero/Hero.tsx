// Libs
import { useEffect } from 'react'
import AOS from 'aos'
// Styles
import './Hero.scss'
import 'aos/dist/aos.css'
// Images
import h1 from '../../../../assets/img/home/hero/h1.jpg'
import h2 from '../../../../assets/img/home/hero/h2.jpg'
import h3 from '../../../../assets/img/home/hero/h3.jpg'
import h4 from '../../../../assets/img/home/hero/h4.jpg'
import h5 from '../../../../assets/img/home/hero/h5.jpg'
import b1 from '../../../../assets/img/home/hero/b1.jpg'
import b2 from '../../../../assets/img/home/hero/b2.jpg'
import b3 from '../../../../assets/img/home/hero/b3.jpg'
import b4 from '../../../../assets/img/home/hero/b4.jpg'
import b5 from '../../../../assets/img/home/hero/b5.jpg'
import star from '../../../../assets/svg/logos/stargaze.svg'
// Components
import Socials from '../../../components/blocks/Socials'

const Hero = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		})
	}, [])

	return (
		<section className="hero">
			<img className="hero-bg" src={star} alt="" />
			<div className="container">
				<div className="hero-wrapper">
					<div className="hero-images" data-aos="fade-up">
						<img src={h2} alt="" />
						<img src={b3} alt="" />
						<img src={h3} alt="" />
						<img src={b5} alt="" />
						<img src={b4} alt="" />
						<img src={h1} alt="" />
						<img src={b1} alt="" />
						<img src={h4} alt="" />
						<img src={b2} alt="" />
						<img src={h5} alt="" />
					</div>
					<div className="hero-blocks" data-aos="fade-in">
						<div className="hero-blocks-top">
							<h1>
								Reach new horizons on{' '}
								<a href="https://www.stargaze.zone/" target="_blank" rel="noopener noreferrer">
									Stargaze
								</a>{' '}
								with
							</h1>
							<div className="hero-subtitle">Cryptomatcha</div>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus commodi iure quaerat
								sequi nesciunt ad dicta. Eius ab quibusdam perferendis laboriosam porro! Ad suscipit
								quis dolorem tenetur fugiat voluptatem ex?
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque labore libero harum
								expedita, ipsam, excepturi quibusdam enim at assumenda, odio mollitia nostrum
								voluptate. Saepe dicta laboriosam non voluptatem consectetur fugiat?
							</p>
						</div>
						<div className="hero-blocks-bottom">
							<Socials />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero