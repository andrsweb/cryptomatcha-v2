import './Title.scss'
import { Link } from 'react-router-dom'

interface TitleProps {
    h2: string
    text: string
    href: string
    linkName: string
}

function Title({ h2, text, href, linkName }: TitleProps) {
    return (
        <div className="title">
            <div className="title-info">
                <h2>{h2}</h2>
                <p>{text}</p>
            </div>
            {href && linkName && (
                <Link to={href} className="button">
                    {linkName}
                </Link>
            )}
        </div>
    )
}

export default Title
