import * as queries from 'src/server/routes/index.queries'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { mocked } from 'jest-mock'
import { createShortUrlRoute } from '../server/routes/index'

jest.mock('src/server/routes/index.queries')

jest.mock('@onmoon/pg-tx', () => {
	return jest.fn()
})

const mockedQueries = mocked(queries)

const mockShortUrlData = { url: 'http://example.com', customCode: 'abcd1234' }

const mockRequest: Partial<FastifyRequest> = {
	body: {
		url: 'http://example.com',
		customCode: 'abcd1234',
	},
}

const mockReply: Partial<FastifyReply> = {
	code: jest.fn().mockReturnThis(),
	send: jest.fn(),
	redirect: jest.fn(),
}

describe('createShortUrlRoute', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('Должен вернуться статус 400, если url отсутствует в request.body', async () => {
		const request = { ...mockRequest, body: {} }
		await createShortUrlRoute(
			request as FastifyRequest,
			mockReply as FastifyReply,
		)

		expect(mockReply.code).toHaveBeenCalledWith(400)
		expect(mockReply.send).toHaveBeenCalledWith({
			error: 'url param is required',
		})
	})

	it('Должен вернуться статус 400, если url больше 16Кб', async () => {
		const request = {
			body: { url: 'https://example.com', customCode: '1234123123123123123' },
		}

		await createShortUrlRoute(
			request as FastifyRequest,
			mockReply as FastifyReply,
		)

		expect(mockReply.code).toHaveBeenCalledWith(400)
		expect(mockReply.send).toHaveBeenCalledWith({
			error: 'custom code is too long, max length 16',
		})
	})

	it('Должен вернуться статус 200 и url + customCode', async () => {
		mockedQueries.createUniqueShortUrl.run.mockResolvedValueOnce([])

		await createShortUrlRoute(
			mockRequest as FastifyRequest,
			mockReply as FastifyReply,
		)

		expect(mockReply.code).toHaveBeenCalledWith(200)
		expect(mockReply.send).toHaveBeenCalledWith({
			url: mockShortUrlData.url,
			code: mockShortUrlData.customCode,
		})
	})
})
