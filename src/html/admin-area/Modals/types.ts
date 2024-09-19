export interface Category {
	id: number
	name: string
}

export interface EditPostModalProps {
	post: {
		id: number
		category: string
		category_id: number
		category_name: string
		title: string
		publication_date: string
		text: string
		image_path: string
	} | null
	onClose: () => void
	onSuccess: () => void
}