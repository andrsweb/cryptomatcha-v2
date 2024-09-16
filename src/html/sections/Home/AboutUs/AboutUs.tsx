import './AboutUs.scss'
import img from '../../../../assets/img/home/about-us/about-sticker.png'
import { Link } from 'react-router-dom'

const AboutUs = () => {
	return (
		<section className='about-us'>
			<div className="container">
				<div className="about-us-wrapper">
					<div className="about-us-left">
						<h2><span data-text="W">W</span>
							<span data-text="h">h</span>
							<span data-text="o">o</span>
							&nbsp;
							<span data-text="w">w</span>
							<span data-text="e">e</span>
							&nbsp;
							<span data-text="a">a</span>
							<span data-text="r">r</span>
							<span data-text="e">e</span>
						</h2>

						<p>
							In our team, everyone has the opportunity to express their ideas, contribute and grow professionally. We support openness, tolerance and mutual respect, creating an atmosphere in which each team member feels respected and an important link in the common cause.
						</p>
						<Link to="/about" className='button'>
							Read More
						</Link>
					</div>
					<div className="about-us-right">
						<img className='about-us-right-img' src={img} alt="" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUs