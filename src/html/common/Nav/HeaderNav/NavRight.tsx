import './HeaderNav.scss'
import { Link } from "react-router-dom"

const NavRight = () => {
	return (
		<nav className="header-menu">
			<ul className="header-menu-list">
				<li className="list-item">
					<Link to="/partnerships">
						Partnerships
					</Link>
				</li>
				<li className="list-item">
					<Link to="/news">
						News
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavRight