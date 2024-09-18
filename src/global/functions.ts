export const toggleBodyScroll = (shouldBlock: boolean) => {
	const body = document.body
	if (shouldBlock) {
		body.classList.add('no-scroll')
	} else {
		body.classList.remove('no-scroll')
	}
}