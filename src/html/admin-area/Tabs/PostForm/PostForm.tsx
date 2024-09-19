// Libs
import { useState, useEffect, useRef } from 'react'
import Quill from 'quill'
import { toast, ToastContainer } from 'react-toastify'
// Styles
import './PostForms.scss'
import '../../../../scss/components/quill/quill.scss'
import 'quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css'
// Types
import { Category, PostFormProps } from './types'
// Components
// Functions
import { createPost, updatePost, getCategories, addCategory, deleteCategory } from '../../../../api/postApi'
import { getTodayDate } from '../../../../global/functions'
// Images
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io"

const PostForm = ({ postId, existingPost, onSuccess }: PostFormProps) => {
	const [title, setTitle] = useState<string>(existingPost?.title || '')
	const [publicationDate, setPublicationDate] = useState<string>(existingPost?.publication_date || getTodayDate())
	const [text, setText] = useState<string>(existingPost?.text || '')
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState<string>(existingPost?.image_path || '')
	const [categoryId, setCategoryId] = useState<number>(existingPost?.category_id || 0)
	const [categories, setCategories] = useState<Category[]>([])
	const [newCategoryName, setNewCategoryName] = useState<string>('')
	const [imageName, setImageName] = useState<string>('No Image chosen')
	const [fileButtonText, setFileButtonText] = useState<string>('Choose Image')

	const quillRef = useRef<Quill | null>(null)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getCategories()
				setCategories(response.data)
			} catch (error) {
				toast.error('Error fetching categories')
				console.error('Error fetching categories:', error)
			}
		}

		fetchCategories()
	}, [])

	useEffect(() => {
		if (quillRef.current) return

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

		if (existingPost?.text) {
			quillRef.current.root.innerHTML = existingPost.text
		}

		quillRef.current.on('text-change', () => {
			setText(quillRef.current?.root.innerHTML || '')
		})

	}, [existingPost])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null
		if (file) {
			setImage(file)
			setImageUrl(URL.createObjectURL(file))
			setImageName(file.name)
			setFileButtonText('Your image')
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('title', title)
		formData.append('publication_date', publicationDate)
		formData.append('text', text)
		formData.append('category_id', String(categoryId))
		if (image) {
			formData.append('image', image)
		}

		try {
			if (postId) {
				await updatePost(postId, formData)
				toast.success('Post updated successfully')
			} else {
				await createPost(formData)
				toast.success('Post created successfully')
			}
			onSuccess()

			setTitle('')
			setPublicationDate(getTodayDate())
			setText('')
			setImage(null)
			setImageUrl('')
			setImageName('No Image chosen')
			setFileButtonText('Choose Image')
			if (quillRef.current) {
				quillRef.current.root.innerHTML = ''
			}
		} catch (error) {
			toast.error('Error saving post')
			console.error('Error saving post:', error)
		}
	}

	const handleCategoryClick = (id: number) => {
		setCategoryId(id)
	}

	const handleAddCategory = async () => {
		if (!newCategoryName.trim()) return

		try {
			const response = await addCategory(newCategoryName)
			setCategories([...categories, response.data])
			setNewCategoryName('')
			setCategoryId(response.data.id)
			toast.success('Category added successfully')
		} catch (error) {
			toast.error('Error adding category')
			console.error('Error adding category:', error)
		}
	}

	const handleDeleteCategory = async (id: number) => {
		try {
			await deleteCategory(id)
			setCategories(categories.filter(category => category.id !== id))
			if (categoryId === id) {
				setCategoryId(0)
			}
			toast.success('Category deleted successfully')
		} catch (error) {
			toast.error('Error deleting category')
			console.error('Error deleting category:', error)
		}
	}

	const isButtonDisabled = !title || !categoryId

	return (
		<>
			<ToastContainer />
			<form className="add-post-form" onSubmit={handleSubmit}>
				<legend>{postId ? 'Edit Post' : 'Add New Post'}</legend>
				<div className="add-post-form-wrapper">
					<div className="add-post-form-inner">
						<div className="add-post-form-categories">
							<div className="categories-inner">
								<div className="categories">
									{categories.map((cat) => (
										<div
											key={cat.id}
											className={`category ${cat.id === categoryId ? 'active' : ''}`}
											onClick={() => handleCategoryClick(cat.id)}
										>
											{cat.name}
											<IoMdRemoveCircle
												className="delete-category-icon"
												onClick={() => handleDeleteCategory(cat.id)}
											/>
										</div>
									))}
								</div>
								<div className="new-category">
									<div className="input-wrapper">
										<label htmlFor="add-category">Add New Category</label>
										<div className="new-category-items">
											<input
												id='add-category'
												type="text"
												placeholder="Add New Category"
												value={newCategoryName}
												onChange={(e) => setNewCategoryName(e.target.value)}
											/>
											<button className='category-button' type="button" onClick={handleAddCategory}>
												<IoMdAddCircle />
											</button>
										</div>
									</div>
								</div>
							</div>
							<fieldset>
								<div className="input-wrapper">
									<label htmlFor='add-title'>Title</label>
									<input
										id='add-title'
										type="text"
										placeholder="Set Title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>
								<div className="input-wrapper">
									<label htmlFor="add-date">Publication Date</label>
									<input
										type="datetime-local"
										value={publicationDate.slice(0, 16)}
										onChange={(e) => setPublicationDate(e.target.value)}
										required
									/>
								</div>
							</fieldset>
						</div>
						<div className="text-editor">
							<div className="text-editor-wrapper">
								<div id="editor" className="quill-editor" />
							</div>
						</div>
					</div>
					<div className="add-post-form-img-wrapper">
						<div className="add-post-form-img">
							{imageUrl && <img src={imageUrl} alt="Preview" />}
						</div>
						<div className="file-upload">
							<input
								id="file-upload"
								className="file-input"
								type="file"
								onChange={handleImageChange}
							/>
							<label htmlFor="file-upload" className="file-label">
								<span className="file-button">{fileButtonText}</span>
								<span className="file-name">{imageName}</span>
							</label>
						</div>
					</div>
				</div>
				<button
					className='submit-button'
					type="submit" disabled={isButtonDisabled}>
					{postId ? 'Save Changes' : 'Add Post'}
				</button>
			</form>
		</>
	)
}

export default PostForm