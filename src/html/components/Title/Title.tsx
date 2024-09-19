import './Title.scss'

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
                <a href={href} className="button">
                    {linkName}
                </a>
            )}
        </div>
    )
}

export default Title
