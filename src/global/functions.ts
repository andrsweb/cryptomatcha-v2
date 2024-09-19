export const toggleBodyScroll = (shouldBlock: boolean) => {
	const body = document.body
	if (shouldBlock) {
		body.classList.add('no-scroll')
	} else {
		body.classList.remove('no-scroll')
	}
}

export const removeHtmlTags = (text: string) => {
	const doc = new DOMParser().parseFromString(text, 'text/html')
	return doc.body.textContent || ''
}

export const getTodayDate = () => {
	const today = new Date()
	const year = today.getFullYear()
	const month = String(today.getMonth() + 1).padStart(2, '0')
	const day = String(today.getDate()).padStart(2, '0')
	const hours = String(today.getHours()).padStart(2, '0')
	const minutes = String(today.getMinutes()).padStart(2, '0')
	return `${year}-${month}-${day}T${hours}:${minutes}:00`
}

export const formatDateForInput = (date: string) => {
	const dateObj = new Date(date)
	const year = dateObj.getFullYear()
	const month = String(dateObj.getMonth() + 1).padStart(2, '0')
	const day = String(dateObj.getDate()).padStart(2, '0')
	const hours = String(dateObj.getHours()).padStart(2, '0')
	const minutes = String(dateObj.getMinutes()).padStart(2, '0')
	return `${year}-${month}-${day}T${hours}:${minutes}`
}