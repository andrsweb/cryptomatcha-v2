export interface Category {
	id: number
	name: string
}

export interface ExistingPost {
	title?: string
	publication_date?: string
	text?: string
	image_path?: string
	category_id?: number
}

export interface PostFormProps {
	postId?: number
	existingPost?: ExistingPost
	onSuccess: () => void
}