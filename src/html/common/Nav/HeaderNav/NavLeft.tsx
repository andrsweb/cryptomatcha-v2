import './HeaderNav.scss'
import { Link } from "react-router-dom"

const NavLeft = () => {
	return (
		<nav className="header-menu">
			<ul className="header-menu-list">
				<li className="list-item">
					<Link to="/about">
						About Us
					</Link>
				</li>
				<li className="list-item">
					<Link to="/collections">
						Collections
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavLeft