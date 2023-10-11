/* @name createUniqueShortUrl */
INSERT INTO public.short_urls (url, code)
VALUES (:url!, :customCode);

/* @name getShortUrl */
SELECT url
FROM public.short_urls
WHERE code = :code!;

/* @name addUsedTractionForUrl */
UPDATE public.short_urls
	SET used = used + 1
WHERE code = :code!;