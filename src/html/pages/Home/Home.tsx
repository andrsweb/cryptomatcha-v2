// Sections
import Hero from "../../sections/Home/Hero/Hero"
import Collaborations from "../../sections/Home/Collaborations/Collaborations"
import AboutUs from "../../sections/Home/AboutUs/AboutUs"
import Coin from "../../sections/Home/Coin/Coin"
import GlobalCards from "../../sections/Home/GlobalCards/GlobalCards"
import News from "../../sections/Home/News/News"
import Slides from "../../sections/Home/Slides/Slides"

const Home = () => {
	return (
		<div className="sections">
			<Hero />
			<GlobalCards />
			<AboutUs />
			<Coin />
			<Collaborations />
			<News />
			<Slides />
		</div>
	)
}

export default Home