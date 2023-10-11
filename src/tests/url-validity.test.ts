import { urlValid, urlAbove16KB } from '../components/url-validity'

describe('Валидация URL', () => {
	test('Корректный URL', () => {
		expect(urlValid('https://google.com/')).toBe(true)
	})

	test('Некорректный протокол', () => {
		expect(urlValid('htps://google.com/')).toBe(false)
	})

	test('Некорректный домен', () => {
		expect(urlValid('https://googlecom/')).toBe(false)
	})

	test('Некорректный символ в протоколе', () => {
		expect(urlValid('https:!/google.com/')).toBe(false)
	})

	test('Некорректный символ в домене', () => {
		expect(urlValid('https://go~!gle.com/')).toBe(false)
	})
})

describe('Ограничение размера URL', () => {
	test('URL размером 16kb', () => {
		expect(urlAbove16KB('https://google.com/'.repeat((16 * 1024) / 19))).toBe(
			false,
		)
	})

	test('URL размером больше 16kb', () => {
		expect(
			urlAbove16KB('https://google.com/'.repeat((16 * 1024) / 19 + 1)),
		).toBe(true)
	})
})
