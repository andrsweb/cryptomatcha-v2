// Sections
import Hero from "../../sections/Home/Hero/Hero"
import Collaborations from "../../sections/Home/Collaborations/Collaborations"
import AboutUs from "../../sections/Home/AboutUs/AboutUs"
import Coin from "../../sections/Home/Coin/Coin"
import GlobalCards from "../../sections/Home/GlobalCards/GlobalCards"

const Home = () => {
	return (
		<div className="sections">
			<Hero />
			<GlobalCards />
			<AboutUs />
			<Coin />
			<Collaborations />
		</div>
	)
}

export default Home