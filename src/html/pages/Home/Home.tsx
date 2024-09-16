// Sections
import Hero from "../../sections/Home/Hero/Hero"
import Collaborations from "../../sections/Home/Collaborations/Collaborations"
import AboutUs from "../../sections/Home/AboutUs/AboutUs"
import Coin from "../../sections/Home/Coin/Coin"

const Home = () => {
	return (
		<div className="sections">
			<Hero />
			<AboutUs />
			<Coin />
			<Collaborations />
		</div>
	)
}

export default Home