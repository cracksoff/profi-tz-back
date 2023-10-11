/** Types generated for queries found in "src/server/routes/index.sql" */
import { PreparedQuery } from '@pgtyped/runtime'

/** 'CreateUniqueShortUrl' parameters type */
export interface ICreateUniqueShortUrlParams {
	customCode?: string | null | void
	url: string
}

/** 'CreateUniqueShortUrl' return type */
export type ICreateUniqueShortUrlResult = void

/** 'CreateUniqueShortUrl' query type */
export interface ICreateUniqueShortUrlQuery {
	params: ICreateUniqueShortUrlParams
	result: ICreateUniqueShortUrlResult
}

const createUniqueShortUrlIR: any = {
	usedParamSet: { url: true, customCode: true },
	params: [
		{
			name: 'url',
			required: true,
			transform: { type: 'scalar' },
			locs: [{ a: 50, b: 54 }],
		},
		{
			name: 'customCode',
			required: false,
			transform: { type: 'scalar' },
			locs: [{ a: 57, b: 67 }],
		},
	],
	statement:
		'INSERT INTO public.short_urls (url, code)\nVALUES (:url!, :customCode)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO public.short_urls (url, code)
 * VALUES (:url!, :customCode)
 * ```
 */
export const createUniqueShortUrl = new PreparedQuery<
	ICreateUniqueShortUrlParams,
	ICreateUniqueShortUrlResult
>(createUniqueShortUrlIR)

/** 'GetShortUrl' parameters type */
export interface IGetShortUrlParams {
	code: string
}

/** 'GetShortUrl' return type */
export interface IGetShortUrlResult {
	url: string
}

/** 'GetShortUrl' query type */
export interface IGetShortUrlQuery {
	params: IGetShortUrlParams
	result: IGetShortUrlResult
}

const getShortUrlIR: any = {
	usedParamSet: { code: true },
	params: [
		{
			name: 'code',
			required: true,
			transform: { type: 'scalar' },
			locs: [{ a: 47, b: 52 }],
		},
	],
	statement: 'SELECT url\nFROM public.short_urls\nWHERE code = :code!',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT url
 * FROM public.short_urls
 * WHERE code = :code!
 * ```
 */
export const getShortUrl = new PreparedQuery<
	IGetShortUrlParams,
	IGetShortUrlResult
>(getShortUrlIR)

/** 'AddUsedTractionForUrl' parameters type */
export interface IAddUsedTractionForUrlParams {
	code: string
}

/** 'AddUsedTractionForUrl' return type */
export type IAddUsedTractionForUrlResult = void

/** 'AddUsedTractionForUrl' query type */
export interface IAddUsedTractionForUrlQuery {
	params: IAddUsedTractionForUrlParams
	result: IAddUsedTractionForUrlResult
}

const addUsedTractionForUrlIR: any = {
	usedParamSet: { code: true },
	params: [
		{
			name: 'code',
			required: true,
			transform: { type: 'scalar' },
			locs: [{ a: 59, b: 64 }],
		},
	],
	statement:
		'UPDATE public.short_urls\n\tSET used = used + 1\nWHERE code = :code!',
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE public.short_urls
 * 	SET used = used + 1
 * WHERE code = :code!
 * ```
 */
export const addUsedTractionForUrl = new PreparedQuery<
	IAddUsedTractionForUrlParams,
	IAddUsedTractionForUrlResult
>(addUsedTractionForUrlIR)
