import process from 'node:process'
import fastifyServer, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { getShortUrlRoute, createShortUrlRoute } from 'src/server/routes'

export async function build(): Promise<FastifyInstance> {
	const fastify = fastifyServer()

	await fastify.register(cors, {
		credentials: true,
		origin: [/http:\/\/localhost:\d+/],
	})

	// в данном случае cors не нужен, просто стандартная практика для api

	await fastify.register((api, _, done) => {
		api.get('/:code', getShortUrlRoute)

		api.post(`/create`, createShortUrlRoute)

		done()
	})

	return fastify
}

export async function start() {
	const fastify = await build()

	await fastify.listen({
		port: Number(process.env.SERVER_PORT ?? 8080),
		host: '0.0.0.0',
	})

	console.log(`🚀 server started on port ${process.env.SERVER_PORT ?? 8080}`)
}
