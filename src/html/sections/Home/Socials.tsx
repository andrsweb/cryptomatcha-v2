import { RxDiscordLogo } from "react-icons/rx"
import { BsTwitterX } from "react-icons/bs"
import { FaMediumM } from "react-icons/fa"
import { PiTelegramLogo } from "react-icons/pi"

const Socials = () => {
	return (
		(
			<div className="hero-socials">
				<a href="#" className="hero-link" target="_blank">
					<RxDiscordLogo />
				</a>
				<a href="#" className="hero-link" target="_blank">
					<BsTwitterX />
				</a>
				<a href="#" className="hero-link" target="_blank">
					<PiTelegramLogo />
				</a>
				<a href="#" className="hero-link" target="_blank">
					<FaMediumM />
				</a>
			</div>
		)
	)
}

export default Socials