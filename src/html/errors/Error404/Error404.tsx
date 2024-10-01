import './Error404.scss'
import { Link } from 'react-router-dom'
import neo from '../../../assets/img/errors/neo.png'
import { FaHome } from "react-icons/fa"

const Error404 = () => {
	return (
		<div className="not-found-container">
			<div className="matrix">
				{Array.from({ length: 10 }).map((_, index) => (
					<span
						key={index}
						style={{
							animationDelay: `${Math.random() * 5}s`,
							left: `${Math.random() * 100}vw`
						}}
					>
						{String.fromCharCode(Math.random() * 122 + 33)}
					</span>
				))}
			</div>
			<div className="not-found-container-inner">
				<div className="not-found-container-img">
					<img src={neo} alt="" />
					<Link to="/"><FaHome /></Link>
				</div>
				<div className="not-found-container-info">
					<div className="not-found-container-title">-404-</div>
					<p>Sorry, the page you are looking for does not exist.</p>
				</div>
			</div>
		</div>
	)
}

export default Error404
