import process from 'node:process'
import { DatabaseError } from 'pg-protocol/dist/messages'
import { urlValid, urlAbove16KB } from 'src/components/url-validity'
import * as queries from 'src/server/routes/index.queries'
import { db } from 'src/utils'
import { type FastifyRequest, type FastifyReply } from 'fastify'

const CODE_MAX_LENGTH = 16

export async function getShortUrlRoute(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const { code } = request.params as { code: string }

		if (!code) {
			return await reply.code(400).send({ error: 'code is not provided' })
		}

		const [shortUrl] = await queries.getShortUrl.run({ code }, db)

		if (!shortUrl) {
			return await reply.code(404).send({ error: 'short url not found' })
		}

		void queries.addUsedTractionForUrl.run({ code }, db)

		return await reply.redirect(shortUrl.url)
	} catch (error: unknown) {
		if (process.env.NODE_ENV === 'development') {
			console.log('getShortUrlRoute error:', error)
		}

		if (error instanceof Error) {
			return reply.code(500).send({ error: error.message })
		}

		await reply.code(500).send({ error: 'internal server error' })
	}
}

export async function createShortUrlRoute(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// не стал делать проверку на существование url в базе, так как, возможно мы можем хотеть отслеживать конкретного юзера и чарджить его за каждый переход по ссылке
	try {
		const { url, customCode } =
			(request.body as {
				url?: string
				customCode?: string
			}) ?? {}

		if (!url) {
			return await reply.code(400).send({ error: 'url param is required' })
		}

		if (urlAbove16KB(url)) {
			return await reply
				.code(400)
				.send({ error: 'provided url is too heavy (more than 16kb)' })
		}

		if (!urlValid(url)) {
			return await reply.code(400).send({ error: 'invalid url' })
		}

		if (customCode && customCode.length > CODE_MAX_LENGTH) {
			return await reply
				.code(400)
				.send({ error: 'custom code is too long, max length 16' })
		}

		await queries.createUniqueShortUrl.run({ url, customCode }, db) // инсертим в базу только оригинальный url и customCode, так как код генерируется через функцию в базе

		return await reply.code(200).send({ url, code: customCode })
	} catch (error: unknown) {
		if (process.env.NODE_ENV === 'development') {
			console.log('createShortUrlRoute error:', error)
		}

		// решил хендлить ошибку дубликата кода через ошибку в базе, тк код уникальный и лишний запрос на проверку в базу не нужен
		if (error instanceof DatabaseError && error.code === '23505') {
			return reply.code(400).send({ error: 'code already used' })
		}

		if (error instanceof Error) {
			return reply.code(500).send({ error: error.message })
		}

		await reply.code(500).send({ error: 'internal server error' })
	}
}
