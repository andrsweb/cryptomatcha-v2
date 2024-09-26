import './Coin.scss'
import Logo3D from './Logo3d'
import candles from '../../../../assets/img/home/coin/matcha-coin.png'

const Coin = () => {
	return (
		<section className='coin'>
			<div className="container">
				<div className="coin-wrapper">
			
					<div className="coin-info">
						
						<h2>
							Grow With Us
						</h2>

						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi officia odit tenetur nemo repellat. Reiciendis perspiciatis aspernatur, porro amet, eum ducimus iure dolores autem eos temporibus pariatur. Dicta, voluptatem omnis?
						</p>
						<div className="coin-links">
							<a className='button' href="https://stars.pampit.fun/token/CRMH-1" target='_blank'>Pump It!</a>
							<a className='button' href="https://start.cooking/swap/osmo17myn8ppgfe7pfu6s2yuyf3vryus0vffx767ajvch8ltqxu20d63s4aez0u" target='_blank'>Cook It!</a>
						</div>
					</div>
					<div className="coin-model">
						<Logo3D />
					</div>
				</div>
			</div>
			<img className='candles' src={candles} alt="" />
		</section>
	)
}

export default Coin