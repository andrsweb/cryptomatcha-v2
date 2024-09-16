import './Coin.scss'
import Logo3D from './Logo3d'

const Coin = () => {
	return (
		<section className='coin'>
			<div className="container">
				<div className="coin-wrapper">
					<div className="coin-info">
						<h2>
							<span data-text="G">G</span>
							<span data-text="r">r</span>
							<span data-text="o">o</span>
							<span data-text="w">w</span>
							&nbsp;
							<span data-text="w">w</span>
							<span data-text="i">i</span>
							<span data-text="t">t</span>
							<span data-text="h">h</span>
							&nbsp;
							<span data-text="u">u</span>
							<span data-text="s">s</span>
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
		</section>
	)
}

export default Coin