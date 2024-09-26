import './StargazeError.scss'
import img from '../../../assets/img/errors/s-error.png'

interface ErrorProps {
	message: string
}

const StargazeError = ({ message }: ErrorProps) => {
	return (
		<div className="error-container">
			<div className="error-container-inner">
				<div className="error-container-info">
					<div className="error-title">
						{message}
					</div>
					<p>
						We're currently unable to retrieve the necessary blockchain data. This may be due to a temporary issue with the network or service. Please try refreshing the page or check back later.
					</p>
				</div>
				<img src={img} alt="" />
			</div>
		</div>
	)
}

export default StargazeError
