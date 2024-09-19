import 'swiper/css'
import 'swiper/css/autoplay'
import './Slides.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import b1 from '../../../../assets/img/nft/b1.jpg'
import b2 from '../../../../assets/img/nft/b2.jpg'
import b3 from '../../../../assets/img/nft/b3.jpg'
import b4 from '../../../../assets/img/nft/b4.jpg'
import b5 from '../../../../assets/img/nft/b5.jpg'
import b6 from '../../../../assets/img/nft/b6.jpg'
import h1 from '../../../../assets/img/nft/h1.jpg'
import h2 from '../../../../assets/img/nft/h2.jpg'
import h3 from '../../../../assets/img/nft/h3.jpg'
import h4 from '../../../../assets/img/nft/h4.jpg'
import h5 from '../../../../assets/img/nft/h5.jpg'
import h6 from '../../../../assets/img/nft/h6.jpg'

const slides = [
	[b1, h1, b2, h2, b3, h3],
	[b4, h4, b5, h5, b6, h6],
]

const Slides = () => {
	return (
		<div className="nft-slides">
			<div className="nft-slides-wrapper">
				{slides.map((slideGroup, index) => (
					<Swiper
						key={index}
						spaceBetween={20}
						slidesPerView={5}
						loop={true}
						allowTouchMove={false}
						autoplay={{
							delay: 0,
							disableOnInteraction: true,
							reverseDirection: index % 2 === 1
						}}
						speed={20000}
						modules={[Autoplay]}
						className="nft-swiper"
						breakpoints={{
							320: {
								slidesPerView: 2,
								spaceBetween: 8
							},
	
							768: {
								slidesPerView: 3
							},

							1366: {
								slidesPerView: 4,
								spaceBetween: 20
							}
						}}
					>
						{slideGroup.map((image, imgIndex) => (
							<SwiperSlide key={imgIndex}>
								<div className="nft-img">
									<img src={image} alt={`Slide ${imgIndex}`} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				))}
			</div>
		</div>
	)
}

export default Slides
