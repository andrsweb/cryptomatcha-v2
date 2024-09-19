// Libs
import { useState, useEffect, useRef } from 'react'
import Quill from 'quill'
import { toast } from 'react-toastify'
import axios from 'axios'
// Constants
import { API_BASE_URL } from '../../../global/constants'
// Styles
import 'quill/dist/quill.snow.css'
// Functions
import { updatePost } from '../../../api/postApi'
import { toggleBodyScroll } from '../../../global/functions'
import { formatDateForInput } from '../../../global/functions'
// Images
import { IoTimeOutline } from "react-icons/io5"
// Types
import { Category, EditPostModalProps } from './types'

const EditPostModal = ({ post, onClose, onSuccess }: EditPostModalProps) => {
	const [categories, setCategories] = useState<Category[]>([])
	const [categoryId, setCategoryId] = useState<number>(0)
	const [title, setTitle] = useState<string>('')
	const [publicationDate, setPublicationDate] = useState<string>('')
	const [text, setText] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [imageName, setImageName] = useState<string>('No new image chosen')
	const quillRef = useRef<Quill | null>(null)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/categories`)
				setCategories(response.data)
			} catch (error) {
				console.error('Error fetching categories:', error)
			}
		}

		if (post) {
			fetchCategories()
			setCategoryId(post.category_id)
			setTitle(post.title)
			setPublicationDate(formatDateForInput(post.publication_date))
			setText(post.text)
			setImagePreview(`${API_BASE_URL}${post.image_path}?t=${new Date().getTime()}`)

			if (post.image_path) {
				const imageName = post.image_path.split('/').pop() || 'No new image chosen'
				setImageName(imageName)
			}

			if (!quillRef.current) {
				quillRef.current = new Quill('#editor', {
					modules: {
						toolbar: [
							[{ 'header': '2' }, { 'header': '3' }, { 'header': '4' }],
							['bold', 'italic', 'underline'],
							[{ 'list': 'ordered' }, { 'list': 'bullet' }],
							['link'],
							['clean']
						],
					},
					theme: 'snow'
				})
				quillRef.current.root.innerHTML = post.text

				quillRef.current.on('text-change', () => {
					setText(quillRef.current?.root.innerHTML || '')
				})
			} else {
				quillRef.current.root.innerHTML = post.text
			}
		}

		toggleBodyScroll(true)
		return () => toggleBodyScroll(false)
	}, [post])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null
		setImage(file)
		if (file) {
			setImagePreview(URL.createObjectURL(file))
			setImageName(file.name)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (post) {
			const formData = new FormData()
			formData.append('category_id', String(categoryId))
			formData.append('title', title)
			formData.append('publication_date', publicationDate)
			formData.append('text', text)
			if (image) {
				formData.append('image', image)
			}
			try {
				await updatePost(post.id, formData)
				toast.success('Post updated successfully!')
				onSuccess()
			} catch (error) {
				console.error('Error updating post:', error)
				toast.error('Failed to update post. Please try again.')
			}
		}
	}

	const handleCategoryClick = (id: number) => {
		setCategoryId(id)
	}

	const setCurrentDateTime = () => {
		const now = new Date()
		const year = now.getFullYear()
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const day = String(now.getDate()).padStart(2, '0')
		const hours = String(now.getHours()).padStart(2, '0')
		const minutes = String(now.getMinutes()).padStart(2, '0')
		const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`
		setPublicationDate(formattedDateTime)
	}

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	if (!post) return null

	return (
		<div className="modal" onClick={handleOverlayClick}>
			<div className="modal-content edit-content">
				<form onSubmit={handleSubmit}>
					<legend>Edit Post</legend>
					<div className="form-wrapper">
						<fieldset>
							<div className="fieldset-items">
								<div className="categories">
									{categories.map((cat) => (
										<div
											key={cat.id}
											className={`category ${cat.id === categoryId ? 'active' : ''}`}
											onClick={() => handleCategoryClick(cat.id)}
										>
											{cat.name}
										</div>
									))}
									<p>
										If you want to add a new category - please go down and add it in the "Add new post" block.
									</p>
								</div>
								<div className="input-wrapper">
									<label htmlFor="edit-title">
										Edit title
									</label>
									<input
										className='title-input'
										id='edit-title'
										type="text"
										placeholder="Title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>
								<div className="input-wrapper">
									<label htmlFor="edit-date">
										Edit date
									</label>
									<input
										id='edit-date'
										className='date-input'
										type="datetime-local"
										value={publicationDate}
										onChange={(e) => setPublicationDate(e.target.value)}
										required
									/>
								</div>
								<button className='date-button' type="button" onClick={setCurrentDateTime}>
									Set Today’s Date & Time
									<IoTimeOutline />
								</button>
							</div>
							<div className="text-editor">
								<div className="text-editor-wrapper">
									<div id="editor" className="quill-editor" />
								</div>
							</div>
						</fieldset>
						<div className="image-preview">
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Preview"
								/>
							)}
							<div className="file-upload">
								<input
									id="file-upload"
									className="file-input"
									type="file"
									onChange={handleImageChange}
								/>
								<label htmlFor="file-upload" className="file-label">
									<span className="file-button">You can change image</span>
									<span className="file-name">{imageName}</span>
								</label>
							</div>
						</div>
					</div>
					<div className="modal-bottom">
						<button className='submit-button' type="submit">Update Post</button>
						<button className='close-button' onClick={onClose}>Close</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditPostModal