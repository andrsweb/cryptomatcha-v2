// Libs
import { Link } from "react-router-dom";
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
				<div className="title">
					<h2>
						<span data-text="T">T</span>
						<span data-text="o">o</span>
						<span data-text="p">p</span>
						&nbsp;
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
					<Link className='button' to="collaborations">
						View All
					</Link>
				</div>

				<div className="collaborations-wrapper">
					<div className="collaborations-card">
						<div className="collaborations-card-inner">
							<img src={shitmos} alt="" />
							<p>Shitmos</p>
						</div>
					</div>
					<div className="collaborations-card">
						<div className="collaborations-card-inner">
							<img src={smokers} alt="" />
							<p>Smokers Club</p>
						</div>
					</div>
					<div className="collaborations-card">
						<div className="collaborations-card-inner">
							<img src={shade} alt="" />
							<p>Seven Green Shade</p>
						</div>
					</div>
				</div>
				<div className="link-wrapper end"></div>
			</div>
		</section>
	);
};

export default Collaborations;
