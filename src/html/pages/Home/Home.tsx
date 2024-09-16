// Sections
import Hero from "../../sections/Home/Hero/Hero"
import AboutUs from "../../sections/Home/AboutUs/AboutUs"
import Coin from "../../sections/Home/Coin/Coin"

const Home = () => {
	return (
		<div className="sections">
			<Hero />
			<AboutUs />
			<Coin />
		</div>
	)
}

export default Home