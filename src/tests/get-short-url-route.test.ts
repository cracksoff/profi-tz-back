import * as queries from 'src/server/routes/index.queries'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { mocked } from 'jest-mock'
import { getShortUrlRoute } from '../server/routes/index'

jest.mock('src/server/routes/index.queries')

jest.mock('@onmoon/pg-tx', () => {
	return jest.fn()
})

const mockedQueries = mocked(queries)

const mockShortUrlData = { url: 'http://example.com' }

const mockRequest: Partial<FastifyRequest> = {
	params: {
		code: 'abcd1234',
	},
}

const mockReply: Partial<FastifyReply> = {
	code: jest.fn().mockReturnThis(),
	send: jest.fn(),
	redirect: jest.fn(),
}

describe('getShortUrlRoute', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	// обычно пишу на английском, решил для тз выбрать русский для удобства
	it('Должен отдаваться статус 400, если code отсутствует в params', async () => {
		const request = { ...mockRequest, params: {} }
		await getShortUrlRoute(request as FastifyRequest, mockReply as FastifyReply)
		expect(mockReply.code).toHaveBeenCalledWith(400)
		expect(mockReply.send).toHaveBeenCalledWith({
			error: 'code is not provided',
		})
	})

	it('Должен вернуться статус 404, если shortUrl не найден.', async () => {
		mockedQueries.getShortUrl.run.mockResolvedValueOnce([])
		await getShortUrlRoute(
			mockRequest as FastifyRequest,
			mockReply as FastifyReply,
		)
		expect(mockReply.code).toHaveBeenCalledWith(404)
		expect(mockReply.send).toHaveBeenCalledWith({
			error: 'short url not found',
		})
	})

	it(`Должен редиректить на страницу shortUrl'a`, async () => {
		mockedQueries.getShortUrl.run.mockResolvedValueOnce([mockShortUrlData])
		await getShortUrlRoute(
			mockRequest as FastifyRequest,
			mockReply as FastifyReply,
		)
		expect(mockReply.redirect).toHaveBeenCalledWith(mockShortUrlData.url)
	})
})
