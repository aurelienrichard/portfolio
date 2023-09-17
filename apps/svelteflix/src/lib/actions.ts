export const lazyLoad = (node: HTMLImageElement) => {
	const load = () => {
		if (node.naturalWidth) return // already loaded

		node.style.opacity = '0'
		node.style.transition = 'opacity 1s ease'

		node.addEventListener(
			'load',
			() => {
				node.style.opacity = '1'
			},
			{
				once: true
			}
		)
	}

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === 'src') load()
		})
	})

	observer.observe(node, {
		attributes: true
	})

	load()

	return {
		destroy() {
			observer.disconnect()
		}
	}
}
