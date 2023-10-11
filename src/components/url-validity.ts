export function urlValid(url: string): boolean {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // протокол
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // домен
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // или ip (v4) адрес
			'(\\:\\d+)?' + // порт
			'(\\/[-a-z\\d%@_.~+&:]*)*' + // путь
			'(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // параметры
			'(\\#[-a-z\\d_]*)?$',
		'i',
	)

	// я мог бы использовать любую http библиотеку для проверки валидности url
	// используя коды ответов (могут быть проблемы с сайтами закрытыми cloudflare из-за != 200 кода ответа)
	// но это было бы избыточно и потенциально могло бы забирать много данных за которые мы не хотим платить

	return pattern.test(url)
}

export function urlAbove16KB(url: string): boolean {
	const byteSize = new Blob([url]).size

	return byteSize > 16 * 1024
}

// очень мало сайтов готовы принимать жирные url, поэтому я решил ограничиться 16kb, но можно уменьшить еще ниже
// тот же google.com принимает размер по 16кб, internet explorer в этом плане хуже всех и принимает только 2083 символа
// https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
