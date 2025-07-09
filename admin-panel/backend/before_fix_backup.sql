--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: refresh_product_total_amount(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.refresh_product_total_amount() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_product_id uuid;                 -- к какому товару относится операция
BEGIN
  -- ❶  Определяем product_id для любой операции
  IF TG_OP = 'DELETE' THEN
    v_product_id := OLD.product_id;          -- при DELETE берём OLD
  ELSE
    v_product_id := NEW.product_id;          -- при INSERT / UPDATE — NEW
  END IF;

  -- ❷  Пересчитываем оставшиеся «свободные» ключи
  UPDATE products
  SET total_amount = (
    SELECT COUNT(*)                     -- сколько unused-ключей осталось
    FROM   product_keys
    WHERE  product_id = v_product_id
      AND  used       = false
  )
  WHERE id = v_product_id;

  RETURN NULL;                          -- AFTER-триггер → тело вызвавшей операции не меняем
END;
$$;


ALTER FUNCTION public.refresh_product_total_amount() OWNER TO postgres;

--
-- Name: update_total_amount(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_total_amount() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE products
  SET total_amount = (
    SELECT COUNT(*) FROM product_keys
    WHERE product_keys.product_id = NEW.product_id AND used = false
  )
  WHERE id = NEW.product_id;

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_total_amount() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: db_name_aliases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.db_name_aliases (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    table_name character varying(100) NOT NULL,
    alias_name character varying(100) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.db_name_aliases OWNER TO postgres;

--
-- Name: keys_aliases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.keys_aliases (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_key_id uuid NOT NULL,
    code character varying(128) NOT NULL,
    purchased boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.keys_aliases OWNER TO postgres;

--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    body text,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: product_keys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_keys (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_id uuid,
    key_encrypted text NOT NULL,
    used boolean DEFAULT false,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    user_product_id uuid
);


ALTER TABLE public.product_keys OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    category_id uuid,
    denomination character varying(50),
    total_amount integer DEFAULT 0,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    img character varying(255),
    description text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: promo_usage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promo_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    promocode_id uuid NOT NULL,
    used_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.promo_usage OWNER TO postgres;

--
-- Name: promocodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promocodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code character varying(50) NOT NULL,
    expires_at timestamp(6) without time zone,
    denomination integer NOT NULL,
    type character varying(10) NOT NULL
);


ALTER TABLE public.promocodes OWNER TO postgres;

--
-- Name: service_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    operator_id uuid,
    service_desc text NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.service_orders OWNER TO postgres;

--
-- Name: staff_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.staff_members OWNER TO postgres;

--
-- Name: staff_rights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_rights (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role character varying(50) NOT NULL,
    component_name character varying(100) NOT NULL,
    can_access boolean DEFAULT true,
    staff_member_id uuid
);


ALTER TABLE public.staff_rights OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(50) NOT NULL,
    duration_days integer NOT NULL,
    price numeric(10,2) NOT NULL,
    description text,
    image text
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: support_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    status character varying(20),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.support_requests OWNER TO postgres;

--
-- Name: user_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    added_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    product_key_id uuid,
    code text
);


ALTER TABLE public.user_products OWNER TO postgres;

--
-- Name: user_subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    subscription_id uuid NOT NULL,
    start_date date NOT NULL,
    end_date timestamp(6) without time zone NOT NULL,
    active boolean DEFAULT false
);


ALTER TABLE public.user_subscriptions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20),
    password character varying NOT NULL,
    subscription_id uuid,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f3b8c81f-b384-49a1-9a0d-30b9580c6f4e	5aa528b4a1aecd0167721e99400bffceb0f61d306db067f6793e8a71636af209	2025-07-07 15:29:39.047582+03	20250707_baseline		\N	2025-07-07 15:29:39.047582+03	0
d4de05f8-7f38-4004-810c-4b8675f2e54b	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	2025-07-08 14:31:39.249115+03	20250708143200_unique_name_constraints		\N	2025-07-08 14:31:39.249115+03	0
51a9fbcd-ccf6-456c-a4d8-64f8f2dd46e3	5879a56d2309bea8e090c29d63dc0ad537d857d41410f6a3a30968ac088327bf	2025-07-09 12:26:50.037037+03	20250709122615_refresh_total_amount		\N	2025-07-09 12:26:50.037037+03	0
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, created_at, updated_at) FROM stdin;
d79a54e1-2439-4f85-b6a3-a3dea82fd2d4	Игровые подписки	2025-06-15 14:14:54.477152+03	2025-06-15 14:14:54.477152+03
aa713825-c867-486e-832c-e76ef57f82c5	Программное обеспечение	2025-06-15 14:14:54.477152+03	2025-06-15 14:14:54.477152+03
41a3d54d-e247-4428-aa6a-d158b2fbf273	Облачные сервисы	2025-06-15 14:14:54.477152+03	2025-06-15 14:14:54.477152+03
4a02a145-d328-4e5c-80a2-1fc32b54a872	Мультимедиа	2025-06-15 14:14:54.477152+03	2025-06-15 14:14:54.477152+03
b3492cb2-7d55-421f-bb5d-c251b59ec13f	Виртуальные товары	2025-06-15 14:14:54.477152+03	2025-06-15 14:14:54.477152+03
89cbee49-c9f9-4f5c-b5fb-67ae0ff96a3a	Категория 1	2025-06-23 13:46:49.208997+03	2025-06-23 13:46:49.208997+03
7c064c5b-1216-4dfe-b4de-12e267a95ad7	Категория 2	2025-06-23 13:46:49.208997+03	2025-06-23 13:46:49.208997+03
68d288f9-7eba-4b6c-a62c-650e6b5526c1	Категория 3	2025-06-23 13:46:49.208997+03	2025-06-23 13:46:49.208997+03
1b7aec57-83f0-40c1-9e4d-37909653fcd9	Категория 4	2025-06-23 13:46:49.208997+03	2025-06-23 13:46:49.208997+03
2b396a1b-5026-4726-9a39-8e5cf0e7f60c	Категория 5	2025-06-23 13:46:49.208997+03	2025-06-23 13:46:49.208997+03
\.


--
-- Data for Name: db_name_aliases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.db_name_aliases (id, table_name, alias_name, description) FROM stdin;
e8b3a0b2-b404-4c81-83b9-0ab07dffda8d	user_subscriptions	Покупки пользователей	Таблица с информацией о покупках пользователей
f3b0cb9b-a35c-463a-9efc-ce5efc3a7570	categories	Категории товаров	Таблица с категориями товаров
f8992033-a5b2-4966-958c-9b3bc4b1026b	support_requests	Заявки в поддержку	Таблица с заявками пользователей в службу поддержки
0014c71b-4f04-4f38-b77d-e67130cbdf8d	news	Новости	Таблица с новыми записями для новостей и обновлений
9061c73b-9b7b-49da-8549-53d8603eb624	promocodes	Промокоды	Таблица с активными промокодами
3b7b0f74-b15b-46ba-85be-c97df3f273ea	users	Пользователи	Таблица с данными о пользователях
a4bc99d9-34d0-4035-9a2a-51a2a32ae656	products	Продукты	Таблица с товарами, доступными для покупки
046f6174-d4f7-4c33-b943-0bc74ec899ff	promo_usage	Использованные промокоды	Таблица с информацией об использовании промокодов
5afc26d6-ab2a-462c-b7d1-d420d3611619	product_keys	Ключи	Список ключей активации, прикреплённых к товарам
bd5545ec-0dc9-4e99-8c4d-aeb417344e44	subscriptions	Подписки	Таблица с данными о подписках
\.


--
-- Data for Name: keys_aliases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keys_aliases (id, product_key_id, code, purchased, created_at, updated_at) FROM stdin;
cc22198f-2aa9-41b0-a49f-a6f739dd5219	864b1816-e4f5-40bd-ae60-eac715987cab	db780f746e41cec1a19fbae21793962ff401779cedde	f	2025-07-07 01:38:56.385133+03	2025-07-07 01:38:56.385133+03
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, body, created_at) FROM stdin;
\.


--
-- Data for Name: product_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_keys (id, product_id, key_encrypted, used, created_at, updated_at, user_product_id) FROM stdin;
864b1816-e4f5-40bd-ae60-eac715987cab	94605277-d4b4-4103-bcba-ecd38556f998	9d2143323905989e	f	2025-07-07 00:04:51.657+03	2025-07-09 11:36:33.071+03	\N
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, category_id, denomination, total_amount, created_at, updated_at, img, description) FROM stdin;
9b1295a1-a52d-4cfb-839a-e62d611a8595	Adobe Photoshop CC - 1 месяц	1190.00	aa713825-c867-486e-832c-e76ef57f82c5	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
364b47ed-cce0-41a7-a13f-a616dbfb2481	Google Drive - 100 ГБ	150.00	41a3d54d-e247-4428-aa6a-d158b2fbf273	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
b126cc2f-e1c3-4918-8c3e-781797e7ca09	Netflix - 1 месяц	799.00	4a02a145-d328-4e5c-80a2-1fc32b54a872	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
ad0c4d0b-6cdf-4c03-8c88-3b40fda76ddc	Spotify - 1 месяц	169.00	4a02a145-d328-4e5c-80a2-1fc32b54a872	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
fb395b77-e8e0-423f-b406-4b7cf5b2ac47	Fortnite V-Bucks	450.00	b3492cb2-7d55-421f-bb5d-c251b59ec13f	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
75e4fed9-6ff6-4ca0-a734-9d09d7ef05bb	Fortnite - 1 месяц подписки	590.00	d79a54e1-2439-4f85-b6a3-a3dea82fd2d4	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	test
c24181f5-2f65-48f1-8054-eece04fe2777	Продукт 2-2	250.00	7c064c5b-1216-4dfe-b4de-12e267a95ad7	\N	1	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	
2c1fa06b-9256-4257-9a4c-b4670a1aa857	Minecraft - 1 месяц подписки	299.00	b3492cb2-7d55-421f-bb5d-c251b59ec13f	\N	1	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
1a2e5334-9a26-4aed-b9a1-74161418114d	Netflix - 1 месяцх	100.00	b3492cb2-7d55-421f-bb5d-c251b59ec13f	\N	0	2025-07-09 11:38:59.754+03	2025-07-09 11:38:59.754+03		test
94605277-d4b4-4103-bcba-ecd38556f998	Microsoft Office 365 - 1 год	2490.00	aa713825-c867-486e-832c-e76ef57f82c5	\N	1	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
7cc304cf-b10e-4bc8-95b8-853767d04535	Продукт 3-2	350.00	68d288f9-7eba-4b6c-a62c-650e6b5526c1	\N	3	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
e78e2254-15f2-4b96-922c-12ec0cfb3014	Продукт 4-1	400.00	1b7aec57-83f0-40c1-9e4d-37909653fcd9	\N	3	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
2b1d6da9-3f53-4c4f-ba7e-597e527b97d0	Продукт 4-2	450.00	1b7aec57-83f0-40c1-9e4d-37909653fcd9	\N	3	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
3fadf04d-e083-4862-8d46-8abd51891735	Продукт 5-1	500.00	2b396a1b-5026-4726-9a39-8e5cf0e7f60c	\N	3	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
8bbbb6fd-741e-4ebe-b1f0-606570b07720	Продукт 5-2	550.00	2b396a1b-5026-4726-9a39-8e5cf0e7f60c	\N	3	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
602830a1-4af2-474a-9de0-983a29155287	Продукт 1-1	100.00	89cbee49-c9f9-4f5c-b5fb-67ae0ff96a3a	\N	4	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
b3c0bd78-f26c-46c2-ab3d-3a1b48e0a1cd	Steam - 1 месяц подписки	990.00	d79a54e1-2439-4f85-b6a3-a3dea82fd2d4	\N	1	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
1afc7280-5430-4a20-9c09-c386e2c6774a	Продукт 1-2	150.00	89cbee49-c9f9-4f5c-b5fb-67ae0ff96a3a	\N	1	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
cd3e6dd2-090e-4ddf-b459-24296092b465	Продукт 3-1	300.00	68d288f9-7eba-4b6c-a62c-650e6b5526c1	\N	1	2025-06-23 13:47:24.549968+03	2025-06-23 13:47:24.549968+03	\N	\N
9e067561-2f2d-4448-8f43-ef07b3f50ab2	Dropbox - 1 ТБ	399.00	41a3d54d-e247-4428-aa6a-d158b2fbf273	\N	2	2025-06-15 14:15:04.303789+03	2025-06-15 14:15:04.303789+03	\N	\N
\.


--
-- Data for Name: promo_usage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promo_usage (id, user_id, promocode_id, used_at) FROM stdin;
\.


--
-- Data for Name: promocodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promocodes (id, code, expires_at, denomination, type) FROM stdin;
593dec7b-8125-420d-9811-1a75eed200af	DISCOUNT10	2025-12-31 00:00:00	10	discount
2cc3d7b5-e73b-4d94-82d8-a2c791b17d62	DISCOUNT20	2025-12-31 00:00:00	20	discount
\.


--
-- Data for Name: service_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service_orders (id, user_id, operator_id, service_desc, status, created_at) FROM stdin;
\.


--
-- Data for Name: staff_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_members (id, username, email, password, role, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: staff_rights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_rights (id, role, component_name, can_access, staff_member_id) FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, title, duration_days, price, description, image) FROM stdin;
adbf61db-f102-4c64-89be-f8d54972ed5a	Разовое обращение по продуктам	1	590.00	Оплата за разовое обращение по вопросам цифровых продуктов	one_time_request.jpg
6bb80ad4-f3be-4455-87ba-5c0734ee574b	Месячная подписка на продукты	30	990.00	Месячная подписка на доступ к цифровым услугам	monthly_subscription.jpg
402e694f-b8b2-45af-be7c-fb9eccfdbc9f	3 месячная подписка	90	1490.00	Трехмесячная подписка на цифровые продукты и услуги	three_month_subscription.jpg
4c8eda38-a1f4-4210-8162-b5109cf6d0ba	6 месячная подписка	180	2490.00	Шестимесячная подписка для доступа к цифровым сервисам	six_month_subscription.jpg
bf0e0631-54e4-4dd0-b3e1-b5813db9913f	Годовая подписка на все продукты	365	3490.00	Годовая подписка на цифровые услуги	annual_subscription.jpg
7643235e-5f6b-480c-b4c5-c7ed4f447cba	2 года подписка на все продукты	730	5990.00	Двухлетняя подписка на цифровые сервисы	two_year_subscription.jpg
e2d199ef-4171-499c-8ee7-c86c437349cd	Решение проблемы Ютуб	1	1990.00	Решение проблем с видео платформой YouTube	youtube_problem_solution.jpg
9fffe2de-2712-4982-9e64-959b89de1071	Консультация по подпискам	0	0.00	Бесплатная консультация по всем цифровым подпискам	https://newcdn.igromania.ru/articles/pics/tmp/images/2024/8/2/b0f1addc-a640-42ce-8a4b-03d3db6b8a34.webp
\.


--
-- Data for Name: support_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_requests (id, user_id, title, description, status, created_at) FROM stdin;
9f97dc0f-79de-4b83-b2ec-13d0999c5d5d	c7e9b95e-b8f8-4bf6-bb16-243ffbe99362	Тестовое обращение	Нужна помощь по подписке на цифровой продукт	pending	2025-06-15 13:54:06.680884
\.


--
-- Data for Name: user_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_products (id, user_id, product_id, added_at, product_key_id, code) FROM stdin;
\.


--
-- Data for Name: user_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_subscriptions (id, user_id, subscription_id, start_date, end_date, active) FROM stdin;
d1562a0f-7906-42e6-a17a-00339c18b490	c7e9b95e-b8f8-4bf6-bb16-243ffbe99362	6bb80ad4-f3be-4455-87ba-5c0734ee574b	2025-06-01	2025-06-30 00:00:00	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, phone, password, subscription_id, created_at) FROM stdin;
c7e9b95e-b8f8-4bf6-bb16-243ffbe99362	toneryy	daniil.samsung.tab2@gmail.com	+79952371047	$2b$10$VuhcrLCtUnqmfk66jgJ.veMvfYIwAQvqyJ/OL5H2ORbVec61LA7NW	\N	2025-06-15 13:38:43.727+03
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: db_name_aliases db_name_aliases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_name_aliases
    ADD CONSTRAINT db_name_aliases_pkey PRIMARY KEY (id);


--
-- Name: keys_aliases keys_aliases_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keys_aliases
    ADD CONSTRAINT keys_aliases_code_key UNIQUE (code);


--
-- Name: keys_aliases keys_aliases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keys_aliases
    ADD CONSTRAINT keys_aliases_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: product_keys product_keys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_keys
    ADD CONSTRAINT product_keys_pkey PRIMARY KEY (id);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: promo_usage promo_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_usage
    ADD CONSTRAINT promo_usage_pkey PRIMARY KEY (id);


--
-- Name: promocodes promocodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promocodes
    ADD CONSTRAINT promocodes_pkey PRIMARY KEY (id);


--
-- Name: service_orders service_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_orders
    ADD CONSTRAINT service_orders_pkey PRIMARY KEY (id);


--
-- Name: staff_members staff_members_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_members
    ADD CONSTRAINT staff_members_email_key UNIQUE (email);


--
-- Name: staff_members staff_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_members
    ADD CONSTRAINT staff_members_pkey PRIMARY KEY (id);


--
-- Name: staff_rights staff_rights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_rights
    ADD CONSTRAINT staff_rights_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: support_requests support_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_requests
    ADD CONSTRAINT support_requests_pkey PRIMARY KEY (id);


--
-- Name: user_products unique_code; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_products
    ADD CONSTRAINT unique_code UNIQUE (code);


--
-- Name: user_products user_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_products
    ADD CONSTRAINT user_products_pkey PRIMARY KEY (id);


--
-- Name: user_subscriptions user_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: promocodes_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX promocodes_code_key ON public.promocodes USING btree (code);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: product_keys product_keys_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER product_keys_change AFTER INSERT OR DELETE OR UPDATE OF used ON public.product_keys FOR EACH ROW EXECUTE FUNCTION public.refresh_product_total_amount();


--
-- Name: product_keys trg_update_total_amount; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_total_amount AFTER INSERT OR DELETE OR UPDATE ON public.product_keys FOR EACH ROW EXECUTE FUNCTION public.update_total_amount();


--
-- Name: products fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: keys_aliases fk_keys_aliases_product_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keys_aliases
    ADD CONSTRAINT fk_keys_aliases_product_key FOREIGN KEY (product_key_id) REFERENCES public.product_keys(id) ON DELETE CASCADE;


--
-- Name: product_keys fk_keys_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_keys
    ADD CONSTRAINT fk_keys_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_keys fk_keys_purchase; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_keys
    ADD CONSTRAINT fk_keys_purchase FOREIGN KEY (user_product_id) REFERENCES public.user_products(id) ON DELETE SET NULL;


--
-- Name: user_products fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_products
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: user_products fk_product_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_products
    ADD CONSTRAINT fk_product_key FOREIGN KEY (product_key_id) REFERENCES public.product_keys(id) ON DELETE SET NULL;


--
-- Name: user_products fk_purchases_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_products
    ADD CONSTRAINT fk_purchases_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: promo_usage promo_usage_promocode_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_usage
    ADD CONSTRAINT promo_usage_promocode_id_fkey FOREIGN KEY (promocode_id) REFERENCES public.promocodes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: staff_rights staff_rights_staff_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_rights
    ADD CONSTRAINT staff_rights_staff_member_id_fkey FOREIGN KEY (staff_member_id) REFERENCES public.staff_members(id) ON DELETE CASCADE;


--
-- Name: user_subscriptions user_subscriptions_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON DELETE CASCADE;


--
-- Name: users users_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

