CREATE OR REPLACE FUNCTION public.to_base62(number bigint)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
  base62_chars TEXT := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  result TEXT := '';
  remainder BIGINT;
BEGIN
  IF number = 0 THEN
    RETURN '0';
  END IF;

  WHILE number > 0 LOOP
    remainder := number % 62;
    number := number / 62;
    result := substring(base62_chars FROM (remainder + 1)::integer FOR 1) || result;
  END LOOP;

  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_short_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  url_code TEXT;
BEGIN
IF NEW.code IS NOT NULL AND NEW.code <> '' THEN
    RETURN NEW;
  END IF;

  url_code := LEFT(to_base62(EXTRACT(EPOCH FROM NEW.created_at)::BIGINT), 5) || LPAD(to_base62(NEW.id), 3, '0');
  NEW.code := url_code;
  RETURN NEW;
END;
$function$;

CREATE SEQUENCE IF NOT EXISTS short_urls_id_seq;

CREATE TABLE "public"."short_urls" (
    "id" int4 NOT NULL DEFAULT nextval('short_urls_id_seq'::regclass),
    "url" text NOT NULL,
    "code" varchar(16) NOT NULL,
    "used" int4 NOT NULL DEFAULT 0,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX short_urls_code_index ON public.short_urls USING btree (code);

create trigger trg_generate_short_code before
insert
    on
    public.short_urls for each row execute function generate_short_code();
