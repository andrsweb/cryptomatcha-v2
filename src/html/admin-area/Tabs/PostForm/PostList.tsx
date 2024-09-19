// Libs
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// Constants
import { API_BASE_URL } from '../../../../global/constants'
// Components
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal'
import EditPostModal from '../../Modals/EditPostModal'
// Functions
import { getPosts, deletePost } from '../../../../api/postApi'
// Types
import { PostListProps } from '../../types'
// Images
import Pagination from '../../../components/Pagination/Pagination'
import { CiSearch } from "react-icons/ci";


const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}
	return date.toLocaleDateString(undefined, options)
}

const POSTS_PER_PAGE = 4

const PostList = ({ postsUpdated }: PostListProps) => {
	const [posts, setPosts] = useState<any[]>([])
	const [selectedPost, setSelectedPost] = useState<any | null>(null)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
	const [postToDelete, setPostToDelete] = useState<number | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPosts, setTotalPosts] = useState(0)
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		fetchPosts()
	}, [postsUpdated, currentPage, searchQuery])

	const fetchPosts = async () => {
		try {
			const { data } = await getPosts(currentPage, POSTS_PER_PAGE, searchQuery)
			setPosts(data.posts)
			setTotalPosts(data.total)
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}

	const handleEdit = (post: any) => {
		setSelectedPost(post)
		setIsEditModalOpen(true)
	}

	const handleDelete = async () => {
		if (postToDelete !== null) {
			try {
				await deletePost(postToDelete);
				setPosts(posts.filter(post => post.id !== postToDelete));
				setIsConfirmDeleteModalOpen(false);
				setPostToDelete(null);
				toast.success('Post deleted successfully!');
			} catch (error) {
				console.error('Error deleting post:', error);
				toast.error('Error deleting post. Please try again.');
			}
		}
	}


	const handleDeleteClick = (postId: number) => {
		setPostToDelete(postId)
		setIsConfirmDeleteModalOpen(true)
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
		setCurrentPage(1)
	}

	const stripHtmlTags = (text: string) => {
		return text.replace(/<[^>]*>?/gm, '');
	}

	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

	return (
		<div className='posts-wrapper'>
			<div className="tab-content-heading">
				<h4>Posts</h4>
				<span>Total posts: {totalPosts}</span>
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
			<div className='posts-items'>
				{posts.map(post => (
					<div className='post-item' key={post.id}>
						<div className="post-item-inner">
							<div className='post-item-title'>{post.title}</div>
							<div className="post-item-info">
								<div className="post-item-category">
									Category: <span>{post.category_name}</span>
								</div>
								<div className="post-item-date">
									Publicated at: <span>{formatDate(post.publication_date)}</span>
								</div>
							</div>
							<p>{stripHtmlTags(post.text)}</p>
							<div className="crud-buttons">
								<button className='edit-button' onClick={() => handleEdit(post)}>Edit</button>
								<button className='delete-button' onClick={() => handleDeleteClick(post.id)}>Delete</button>
							</div>
						</div>
						{post.image_path && (
							<div className="post-item-img">
								<img
									src={`${API_BASE_URL}${post.image_path}`}
									alt={post.title}
								/>
							</div>
						)}
					</div>
				))}
			</div>
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
			{isEditModalOpen && (
				<EditPostModal
					post={selectedPost}
					onClose={() => setIsEditModalOpen(false)}
					onSuccess={() => {
						setIsEditModalOpen(false)
						fetchPosts()
					}}
				/>
			)}
			{isConfirmDeleteModalOpen && (
				<ConfirmDeleteModal
					isOpen={isConfirmDeleteModalOpen}
					onConfirm={handleDelete}
					onCancel={() => setIsConfirmDeleteModalOpen(false)}
				/>
			)}
		</div>
	)
}

export default PostList