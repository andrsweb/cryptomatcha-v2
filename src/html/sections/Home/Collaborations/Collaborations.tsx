// Libs
// Styles
import "./Collaborations.scss";
import '../../../../scss/components/blocks/title.scss'
// Images
import shitmos from "../../../../assets/img/home/collaborations/shitmos.jpg";
import smokers from "../../../../assets/img/home/collaborations/smokers.jpeg";
import shade from "../../../../assets/img/home/collaborations/shade.jpg";

const Collaborations = () => {
	return (
		<section className="collaborations">
			<div className="container">
				<h2>
					<span data-text="C">C</span>
					<span data-text="o">o</span>
					<span data-text="l">l</span>
					<span data-text="l">l</span>
					<span data-text="a">a</span>
					<span data-text="b">b</span>
					<span data-text="o">o</span>
					<span data-text="r">r</span>
					<span data-text="a">a</span>
					<span data-text="t">t</span>
					<span data-text="i">i</span>
					<span data-text="o">o</span>
					<span data-text="n">n</span>
					<span data-text="s">s</span>
				</h2>
				<div className="collaborations-wrapper">
					<div className="collaborations-card">
						<div className="collaborations-card-img">
							<img src={smokers} alt="" />
						</div>
						<div className="collaborations-card-inner">
							<div className="collaborations-card-title">
								Smoker Club
							</div>
							<p>
								we have many traits in both collections which gives you membership in Smokers Club - place where you can join rumbles and other games and win nice NFTs. Also you can soft-stake smokers NFT on plstaking to earn SMKR token and join raffles there.
							</p>
							<div className="collaborations-card-links">
								<a className="button" href="#" target="_blank">Discord</a>
								<a className="button" href="#" target="_blank">Twitter</a>
							</div>
						</div>
					</div>
					<div className="collaborations-card">
						<div className="collaborations-card-img">
							<img src={shitmos} alt="" />
						</div>
						<div className="collaborations-card-inner">
							<div className="collaborations-card-title">
								Shitmos Economic Zone
							</div>
							<p>
								we are the one of first collections who joined SEZ. 20% of our both collections royalties goes to SEZ treasury for buybacks of Shitmos - a real community moving memecoin in whole Cosmos Community is very strong and grows every day
							</p>
							<div className="collaborations-card-links">
								<a className="button" href="#" target="_blank">Discord</a>
								<a className="button" href="#" target="_blank">Twitter</a>
							</div>
						</div>
					</div>
					<div className="collaborations-card">
						<div className="collaborations-card-img">
							<img src={shade} alt="" />
						</div>
						<div className="collaborations-card-inner">
							<div className="collaborations-card-title">
								Seven green shade
							</div>
							<p>
								we are the one of first collections who joined SEZ. 20% of our both collections royalties goes to SEZ treasury for buybacks of Shitmos - a real community moving memecoin in whole Cosmos Community is very strong and grows every day
							</p>
							<div className="collaborations-card-links">
								<a className="button" href="#" target="_blank">Discord</a>
								<a className="button" href="#" target="_blank">Twitter</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Collaborations;
