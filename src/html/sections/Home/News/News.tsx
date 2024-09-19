// Libs
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import DOMPurify from 'dompurify'
// Constants
import { API_BASE_URL } from '../../../../global/constants'
// Functions
import { getPosts } from '../../../../api/postApi'
import { removeHtmlTags } from '../../../../global/functions'
// Components
import Title from '../../../components/Title/Title'
// Styles
import 'swiper/css'
import './News.scss'
// Types
import { Post } from './types'
// Images
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const News = () => {
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		fetchPosts()
	}, [])

	const fetchPosts = async () => {
		try {
			const { data } = await getPosts(1, 10)
			setPosts(data.posts)
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}

	return (
		<section className='news'>
			<div className='container'>
				<Title
					h2='LATEST NEWS'
					text='Stay tuned for exciting new releases, collaborations, and developments. Join us as we continue to enhance our offerings, introduce fresh utilities, and engage with our vibrant community.'
					href='/news'
					linkName='ALL ARTICLES'
				/>
				<Swiper
					spaceBetween={24}
					slidesPerView={4}
					navigation={{
						nextEl: '.swiper-next',
						prevEl: '.swiper-prev'
					}}
					modules={[Navigation]}
					className='news-swiper'
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 8
						},

						576: {
							slidesPerView: 2,
						},

						992: {
							slidesPerView: 3,
						},
						1366: {
							slidesPerView: 4,
						}
					}}
				>
					{posts.map((post) => (
						<SwiperSlide key={post.id}>
							<a href={`/news/${post.category_name}/${post.slug}`} className='news-slide'>
								<div className="news-slide-box">
									<div className='news-slide-img'>
										<img src={`${API_BASE_URL}${post.image_path}`} alt={post.title} />
									</div>
									<div className='news-slide-info'>
										<div className="news-slide-info-top">
											<div className='news-slide-category button'>
												{post.category_name}
											</div>
											<div className='news-slide-date'>
												{new Date(post.publication_date).toLocaleDateString()}
											</div>
										</div>
										<h3>{post.title}</h3>
										<p>{DOMPurify.sanitize(removeHtmlTags(post.text))}</p>
									</div>

									<div className='news-slide-inner'>
										<div className='news-slide-text'>
											<h3>{post.title}</h3>
											<p>{DOMPurify.sanitize(removeHtmlTags(post.text))}</p>
										</div>
										<div className="read-more">
											<div className="button">Read More <FaArrowRight /></div>
										</div>
									</div>
								</div>

							</a>
						</SwiperSlide>
					))}
				</Swiper>
				<div className='swiper-buttons'>
					<div className='swiper-prev button'>
						<FaArrowLeft />
					</div>
					<div className='swiper-next button'>
						<FaArrowRight />
					</div>
				</div>
			</div>
		</section>
	)
}

export default News