// Libs
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DOMPurify from "dompurify"
// Styles
import './NewsList.scss'
// Functions
import { getPosts, getCategories } from "../../../../api/postApi"
// Constants
import { API_BASE_URL } from "../../../../global/constants"
// Components
import Pagination from "../../../components/Pagination/Pagination"
// Images
import { MdCategory, MdDateRange } from "react-icons/md"
import { FaLongArrowAltRight } from "react-icons/fa";
import readCat from '../../../../assets/img/cats/cat-read-news.png'
import { CiSearch } from "react-icons/ci"

const POSTS_PER_PAGE = 12

const NewsList = () => {
	const [posts, setPosts] = useState<any[]>([])
	const [categories, setCategories] = useState<any[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPosts, setTotalPosts] = useState(0)
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("")

	useEffect(() => {
		fetchCategories()
	}, [])

	useEffect(() => {
		fetchPosts()
	}, [currentPage, searchQuery, selectedCategory])

	const fetchPosts = async () => {
		try {
			const { data } = await getPosts(
				currentPage,
				POSTS_PER_PAGE,
				searchQuery,
				selectedCategory
			)
			setPosts(data.posts)
			setTotalPosts(data.total)
		} catch (error) {
			console.error("Error fetching posts:", error)
		}
	}

	const fetchCategories = async () => {
		try {
			const { data } = await getCategories()
			setCategories(data)
		} catch (error) {
			console.error("Error fetching categories:", error)
		}
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
		setCurrentPage(1)
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
		setCurrentPage(1)
	}

	const stripHTMLTags = (text: string) => {
		return text.replace(/<\/?[^>]+(>|$)/g, "")
	}

	const sanitizeAndStripTags = (text: string) => {
		const sanitizedText = DOMPurify.sanitize(text)
		return stripHTMLTags(sanitizedText)
	}

	const timeAgo = (publicationDate: string) => {
		const now = new Date()
		const published = new Date(publicationDate)
		const diffMs = now.getTime() - published.getTime()
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

		if (diffDays >= 1) {
			if (diffDays === 1) {
				return "Yesterday"
			}
			return published.toLocaleDateString()
		}

		return `${diffHours} hours ago`
	}

	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

	const startPostIndex = (currentPage - 1) * POSTS_PER_PAGE + 1
	const endPostIndex = Math.min(currentPage * POSTS_PER_PAGE, totalPosts)

	return (
		<section className="news-list" id="news-list">
			<div className="container">
				<div className="news-list-wrapper">
					<div className="news-filter">
						<div className="categories">
							<div
								className={`category big ${selectedCategory === "" ? "active" : ""}`}
								onClick={() => handleCategoryChange("")}
							>
								All
							</div>
							{categories.map((category) => (
								<div
									key={category.id}
									className={`category big ${selectedCategory === category.name ? "active" : ""}`}
									onClick={() => handleCategoryChange(category.name)}
								>
									{category.name}
								</div>
							))}
						</div>
						<div className="search">
							<input
								type="search"
								placeholder="Search posts by title"
								value={searchQuery}
								onChange={handleSearchChange}
								className="search-input"
							/>
							<div className="post-search-img">
								<CiSearch />
							</div>
						</div>
					</div>
					<div className="news-items">
						<span className="total-items">
							Showing {startPostIndex}-{endPostIndex} of {totalPosts} articles
						</span>
						<div className="news-items-wrapper">
							{posts.map((post) => (
								<div className="news-item" key={post.id}>
									<Link
										to={`/news/${post.category_name}/${post.slug}`}
										className="news-link"
									>
										{post.image_path && (
											<div className="news-image">
												<img
													src={`${API_BASE_URL}${post.image_path}`}
													alt={post.title}
												/>

											</div>
										)}
										<div className="news-content">
											<div className="news-content-info">
												<div className="news-category">
													<MdCategory />
													{post.category_name}
												</div>
												<div className="news-publicated">
													<MdDateRange />
													{timeAgo(post.publication_date)}
												</div>
											</div>
											<h4 className="news-title">{post.title}</h4>
											<div className="text-content" dangerouslySetInnerHTML={{ __html: sanitizeAndStripTags(post.text) }} />
										</div>
									</Link>
									<div className="news-item-hidden">
										<img src={readCat} alt="" />
										<span>View article <FaLongArrowAltRight /></span>
									</div>
								</div>
							))}
						</div>
					</div>
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</div>
		</section>
	)
}

export default NewsList