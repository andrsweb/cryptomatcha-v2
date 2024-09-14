import { Link } from "react-router-dom"
import './BorderLink.scss'

interface BorderLinkProps {
	href: string
	text: string
  }

  const BorderLink = ({ href, text }: BorderLinkProps) => {
	return (
		<Link className="link-border" to={href}>{text}</Link>
	)
}

export default BorderLink