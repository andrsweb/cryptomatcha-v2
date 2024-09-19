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