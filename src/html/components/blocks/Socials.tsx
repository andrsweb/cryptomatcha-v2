import { RxDiscordLogo } from "react-icons/rx"
import { BsTwitterX } from "react-icons/bs"
import { FaMediumM } from "react-icons/fa"
import { PiTelegramLogo } from "react-icons/pi"
import '../../../scss/components/blocks/socials.scss'

const Socials = () => {
	return (
		(
			<div className="socials">
				<a href="#" className="social-link" target="_blank">
					<RxDiscordLogo />
				</a>
				<a href="#" className="social-link" target="_blank">
					<BsTwitterX />
				</a>
				<a href="#" className="social-link" target="_blank">
					<PiTelegramLogo />
				</a>
				<a href="#" className="social-link" target="_blank">
					<FaMediumM />
				</a>
			</div>
		)
	)
}

export default Socials