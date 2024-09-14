import axios from 'axios'

export const POSTS_URL = 'https://ffb671a86d02.vps.myjino.ru/api/posts'
export const CATEGORIES_URL = 'https://ffb671a86d02.vps.myjino.ru/api/categories'

const getAuthToken = () => localStorage.getItem('adminToken')

export const getPosts = (page: number, limit: number, searchQuery: string = '', category: string = '') =>
	axios.get(POSTS_URL, { params: { page, limit, searchQuery, category } })

export const getPostById = (id: number) => axios.get(`${POSTS_URL}/${id}`)

export const createPost = (postData: FormData) =>
	axios.post(POSTS_URL, postData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${getAuthToken()}`,
		},
	})

export const updatePost = (id: number, postData: FormData) =>
	axios.put(`${POSTS_URL}/${id}`, postData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${getAuthToken()}`,
		},
	})

export const deletePost = (id: number) =>
	axios.delete(`${POSTS_URL}/${id}`, {
		headers: {
			'Authorization': `Bearer ${getAuthToken()}`,
		},
	})

export const getCategories = () => axios.get(CATEGORIES_URL)

export const addCategory = (name: string) =>
	axios.post(CATEGORIES_URL, { name }, {
		headers: { 'Authorization': `Bearer ${getAuthToken()}` }
	})

export const deleteCategory = (id: number) =>
	axios.delete(`${CATEGORIES_URL}/${id}`, {
		headers: { 'Authorization': `Bearer ${getAuthToken()}` }
	})

export const getPostBySlug = async (category: string, slug: string) => {
	return await axios.get(`${POSTS_URL}/${category}/${slug}`)
}