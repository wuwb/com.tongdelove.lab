import { pgTable, varchar, timestamp, text, integer, uniqueIndex, foreignKey, serial, index, jsonb, boolean, smallint, doublePrecision, numeric, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const articleContentType = pgEnum("ArticleContentType", ['Markdown', 'HTML'])
export const articleStatus = pgEnum("ArticleStatus", ['Verifying', 'VerifySuccess', 'VerifyFail'])
export const bookStarStatus = pgEnum("BookStarStatus", ['BookVerifying', 'BookVerifySuccess', 'BookVerifyFail'])
export const bookStatus = pgEnum("BookStatus", ['BookUnpublish', 'BookPublished'])
export const bottomType = pgEnum("BottomType", ['Bottom'])
export const boxType = pgEnum("BoxType", ['BOX'])
export const commentStatus = pgEnum("CommentStatus", ['Verifying', 'VerifySuccess', 'VerifyFail'])
export const commentType = pgEnum("CommentType", ['Post', 'Product', 'Collect', 'Book'])
export const commoditiesCategoryEnum = pgEnum("CommoditiesCategoryEnum", ['ETF', 'Metal', 'Agricultural'])
export const detailType = pgEnum("DetailType", ['Detail'])
export const lidType = pgEnum("LidType", ['Lid'])
export const paperType = pgEnum("PaperType", ['Paper'])
export const platformEnum = pgEnum("PlatformEnum", ['USER', 'ADMIN', 'MERCHANT'])
export const sourceEnum = pgEnum("SourceEnum", ['yuanjisong', 'oschina', 'codemart', 'a5', 'taskcity', 'shixian', 'mayigeek', 'rrkf'])
export const transactionStatus = pgEnum("TransactionStatus", ['PENDING', 'SUCCESS', 'FAILED'])
export const transactionType = pgEnum("TransactionType", ['CHAT_CHATGPT', 'CHAT_GPT_4', 'CREDIT_PURCHASE', 'CHAT_CLAUDE', 'TASK_DAILY_LOGIN', 'TASK_JOIN_DISCORD', 'TASK_FOLLOW_TWITTER', 'TASK_FOLLOW_IG', 'TASK_TRY_10_PROMPTS', 'TASK_CREATE_PROMPT', 'TASK_LIKE_10_PROMPTS', 'TASK_GET_10_LIKES', 'TASK_GET_1_FOLLOWER', 'TASK_FOLLOW_5', 'TASK_GET_5_COMMENTS', 'TIP_CREATOR', 'TASK_SAVE_1_PROMPT', 'TASK_COMMENT_1_PROMPT', 'TASK_SHARE_SOCIAL_MEDIA', 'TASK_JOIN_NEWSLETTER', 'LLAMA2'])
export const userKindEnum = pgEnum("UserKindEnum", ['NORMAL', 'ADMIN'])
export const userLanguageCode = pgEnum("UserLanguageCode", ['en', 'zh', 'de', 'es', 'fr', 'ja', 'pt', 'ru', 'ko', 'tr', 'it', 'nl', 'pl', 'sv', 'id', 'hu', 'el', 'cs', 'ro', 'vi', 'th', 'ms', 'bg', 'fi', 'hi', 'hr', 'lt', 'uk', 'ar', 'bn', 'en_US', 'es_ES', 'fr_FR', 'it_IT', 'pt_PT', 'de_DE', 'tr_TR', 'pl_PL', 'ru_RU', 'id_ID', 'zh_CN', 'zh_TW', 'ja_JP', 'ko_KR', 'th_TH', 'vi_VN', 'bg_BG', 'cs_CZ', 'el_GR', 'fi_FI', 'hi_IN', 'hr_HR', 'hu_HU', 'lt_LT', 'nl_NL', 'ro_RO', 'sv_SE', 'uk_UA', 'ms_MY'])
export const userPermissionRole = pgEnum("UserPermissionRole", ['admin', 'user'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const poemKeywords = pgTable("poem_keywords", {
	id: serial().primaryKey().notNull(),
	poemId: integer("poem_id").notNull(),
	keywordId: text("keyword_id").notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("poem_keywords_poem_id_keyword_id_key").using("btree", table.poemId.asc().nullsLast().op("int4_ops"), table.keywordId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.keywordId],
			foreignColumns: [keyword.id],
			name: "poem_keywords_keyword_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.poemId],
			foreignColumns: [poem.id],
			name: "poem_keywords_poem_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const dataCleaningQueue = pgTable("data_cleaning_queue", {
	id: text().primaryKey().notNull(),
	status: text().default('pending').notNull(),
	totalRecords: integer("total_records").default(0).notNull(),
	cleanedRecords: integer("cleaned_records").default(0).notNull(),
	failedRecords: integer("failed_records").default(0).notNull(),
	config: jsonb(),
	startedAt: timestamp("started_at", { precision: 3, mode: 'string' }),
	completedAt: timestamp("completed_at", { precision: 3, mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	errorMessage: text("error_message"),
}, (table) => [
	index("data_cleaning_queue_status_created_at_idx").using("btree", table.status.asc().nullsLast().op("text_ops"), table.createdAt.desc().nullsFirst().op("text_ops")),
]);

export const temuRequests = pgTable("temu_requests", {
	id: text().primaryKey().notNull(),
	url: text().notNull(),
	method: text().notNull(),
	requestId: varchar("request_id", { length: 255 }),
	path: varchar({ length: 500 }),
	requestHeaders: jsonb("request_headers"),
	requestBody: jsonb("request_body"),
	responseStatus: integer("response_status").notNull(),
	responseText: varchar("response_text", { length: 100 }),
	responseHeaders: jsonb("response_headers"),
	responseBody: jsonb("response_body"),
	requestType: text("request_type").default('fetch').notNull(),
	platform: text().default('temu').notNull(),
	userAgent: text("user_agent"),
	capturedAt: timestamp("captured_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: text("user_id"),
	cleaningJobId: text("cleaning_job_id"),
	isCleaned: boolean("is_cleaned").default(false).notNull(),
	cleanedAt: timestamp("cleaned_at", { precision: 3, mode: 'string' }),
}, (table) => [
	index("temu_requests_captured_at_idx").using("btree", table.capturedAt.desc().nullsFirst().op("timestamp_ops")),
	index("temu_requests_is_cleaned_idx").using("btree", table.isCleaned.asc().nullsLast().op("bool_ops")),
	index("temu_requests_request_id_idx").using("btree", table.requestId.asc().nullsLast().op("text_ops")),
	uniqueIndex("temu_requests_request_id_key").using("btree", table.requestId.asc().nullsLast().op("text_ops")),
	index("temu_requests_url_idx").using("btree", table.url.asc().nullsLast().op("text_ops")),
	index("temu_requests_user_id_captured_at_idx").using("btree", table.userId.asc().nullsLast().op("timestamp_ops"), table.capturedAt.desc().nullsFirst().op("text_ops")),
	foreignKey({
			columns: [table.cleaningJobId],
			foreignColumns: [dataCleaningQueue.id],
			name: "temu_requests_cleaning_job_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const gridPlan = pgTable("grid_plan", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	fundName: text("fund_name"),
	fundCode: text("fund_code"),
	config: jsonb().notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	index("grid_plan_created_at_idx").using("btree", table.createdAt.desc().nullsFirst().op("timestamp_ops")),
]);

export const keyword = pgTable("keyword", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 120 }).notNull(),
	locale: varchar({ length: 5 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	isDefault: integer().notNull(),
	isHot: integer().notNull(),
	isDelete: boolean("is_delete").default(false).notNull(),
	keyword: varchar({ length: 127 }).default('').notNull(),
	sortOrder: integer().notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	url: text().default('').notNull(),
}, (table) => [
	uniqueIndex("keyword_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const poem = pgTable("poem", {
	id: serial().primaryKey().notNull(),
	slug: text().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	locale: text(),
	link: text(),
	image: text(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	annotation: text(),
	annotationZhHant: text("annotation_zh_Hant"),
	authorId: integer().notNull(),
	classify: text(),
	conetntPinYin: text(),
	contentZhHant: text("content_zh_Hant"),
	genre: text(),
	introduce: text(),
	introduceZhHant: text("introduce_zh_Hant"),
	titlePinYin: text(),
	titleZhHant: text("title_zh_Hant"),
	translation: text(),
	translationEn: text("translation_en"),
	translationZhHant: text("translation_zh_Hant"),
	views: integer().default(0).notNull(),
}, (table) => [
	uniqueIndex("poem_slug_key").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [poemAuthor.id],
			name: "poem_authorId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const post = pgTable("post", {
	id: text().primaryKey().notNull(),
	slug: text().notNull(),
	title: varchar({ length: 300 }).notNull(),
	content: text(),
	link: varchar({ length: 300 }),
	image: varchar({ length: 300 }),
	publishedAt: timestamp("published_at", { precision: 3, mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	audit: boolean().default(false).notNull(),
	authorId: text(),
	commentCount: smallint("comment_count").notNull(),
	commentStatus: text("comment_status").default('').notNull(),
	createdBy: text("created_by").default('').notNull(),
	description: text().default('').notNull(),
	favoriteCount: integer().default(0).notNull(),
	guid: text().default('').notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	keyword: text().notNull(),
	likesCount: smallint("likes_count").notNull(),
	menuOrder: smallint("menu_order").notNull(),
	pingStatus: text("ping_status").default('').notNull(),
	pinged: text().default('').notNull(),
	postAuthor: smallint("post_author").default(0).notNull(),
	postContentFiltered: smallint("post_content_filtered").notNull(),
	postDate: timestamp("post_date", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	postDateGmt: timestamp("post_date_gmt", { precision: 3, mode: 'string' }).notNull(),
	postExcerpt: text("post_excerpt").default(''),
	postMimeType: text("post_mime_type").default('').notNull(),
	postModified: timestamp("post_modified", { precision: 3, mode: 'string' }).notNull(),
	postModifiedGmt: timestamp("post_modified_gmt", { precision: 3, mode: 'string' }).notNull(),
	postName: varchar("post_name", { length: 200 }).default('').notNull(),
	postParent: smallint("post_parent").notNull(),
	postPassword: text("post_password").default('').notNull(),
	postStatus: text("post_status").default('').notNull(),
	postTitle: text("post_title").notNull(),
	postType: text("post_type").default('').notNull(),
	readTime: integer(),
	remark: text().default(''),
	status: boolean().notNull(),
	tagList: text().array(),
	toPing: text("to_ping").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	userId: text("user_id").default('').notNull(),
	version: integer().default(1).notNull(),
	viewCount: smallint("view_count").default(0).notNull(),
}, (table) => [
	uniqueIndex("post_id_key").using("btree", table.id.asc().nullsLast().op("text_ops")),
	index("post_post_author_idx").using("btree", table.postAuthor.asc().nullsLast().op("int2_ops")),
	uniqueIndex("post_post_name_key").using("btree", table.postName.asc().nullsLast().op("text_ops")),
	index("post_post_parent_idx").using("btree", table.postParent.asc().nullsLast().op("int2_ops")),
	index("post_post_type_post_status_post_date_id_idx").using("btree", table.postType.asc().nullsLast().op("timestamp_ops"), table.postStatus.asc().nullsLast().op("timestamp_ops"), table.postDate.asc().nullsLast().op("text_ops"), table.id.asc().nullsLast().op("timestamp_ops")),
	uniqueIndex("post_slug_key").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "post_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	email: text().notNull(),
	password: text(),
	role: userPermissionRole().default('user').notNull(),
	username: text(),
	about: text().default(''),
	age: integer(),
	avatar: text(),
	birthDay: timestamp({ precision: 3, mode: 'string' }).notNull(),
	birthday: timestamp({ precision: 3, mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: text("created_by").default('').notNull(),
	credit: doublePrecision().default(0).notNull(),
	currentPeriodEnd: integer(),
	customerId: text(),
	deletedAt: timestamp({ precision: 3, mode: 'string' }),
	departmentId: text("department_id").notNull(),
	deptId: text(),
	displayAme: text("display_ame").default(''),
	emailVerified: timestamp("email_verified", { precision: 3, mode: 'string' }),
	firstName: text("first_name").default(''),
	gender: integer().default(0).notNull(),
	image: text(),
	interests: text().default(''),
	isPublic: boolean().default(true).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	isSuper: integer("is_super").default(0),
	language: userLanguageCode(),
	lastLoginIp: text("last_login_ip").default('').notNull(),
	lastLoginTime: timestamp("last_login_time", { precision: 3, mode: 'string' }),
	lastName: text("last_name").default(''),
	level: integer().default(0).notNull(),
	location: text().default(''),
	name: text(),
	platform: integer().default(0),
	psalt: varchar({ length: 32 }).notNull(),
	qq: text(),
	remark: text().default(''),
	sessionKey: text("session_key").default('').notNull(),
	spam: integer().default(0),
	stripeCustomerId: text().default(''),
	subscription: text().default('free'),
	subscriptionId: text(),
	subscriptionStart: timestamp({ precision: 3, mode: 'string' }),
	tagline: text().default(''),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	userActivationKey: text("user_activation_key"),
	userLogin: text("user_login"),
	userNicename: text("user_nicename").default(''),
	userPass: text("user_pass"),
	userPhone: text("user_phone").default(''),
	userRegistered: timestamp("user_registered", { precision: 3, mode: 'string' }).notNull(),
	userResetKey: text("user_reset_key"),
	userStatus: integer("user_status").default(0),
	userUrl: text("user_url").default(''),
	variantId: integer(),
	version: integer().default(1).notNull(),
	wangwang: text(),
	weixinOpenid: text("weixin_openid").default('').notNull(),
}, (table) => [
	uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("users_user_login_key").using("btree", table.userLogin.asc().nullsLast().op("text_ops")),
	index("users_user_login_user_phone_email_idx").using("btree", table.userLogin.asc().nullsLast().op("text_ops"), table.userPhone.asc().nullsLast().op("text_ops"), table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("users_username_key").using("btree", table.username.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.deptId],
			foreignColumns: [depts.id],
			name: "users_deptId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const sessions = pgTable("sessions", {
	id: text().primaryKey().notNull(),
	sessionToken: text("session_token").notNull(),
	userId: text("user_id").notNull(),
	expires: timestamp({ precision: 3, mode: 'string' }).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("sessions_session_token_key").using("btree", table.sessionToken.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const poemCard = pgTable("poem_card", {
	id: serial().primaryKey().notNull(),
	url: text().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp({ precision: 3, mode: 'string' }),
	content: text(),
	poemId: integer().notNull(),
}, (table) => [
	uniqueIndex("poem_card_url_key").using("btree", table.url.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.poemId],
			foreignColumns: [poem.id],
			name: "poem_card_poemId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const link = pgTable("link", {
	id: text().primaryKey().notNull(),
	url: text().notNull(),
	title: text().notNull(),
	description: text(),
	icon: text(),
	public: boolean().default(true).notNull(),
	status: integer().default(1).notNull(),
	parentId: text("parent_id"),
	categoryId: text("category_id").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("link_id_key").using("btree", table.id.asc().nullsLast().op("text_ops")),
	uniqueIndex("link_title_key").using("btree", table.title.asc().nullsLast().op("text_ops")),
	uniqueIndex("link_url_key").using("btree", table.url.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "link_category_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "link_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const menu = pgTable("Menu", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	type: text().default('').notNull(),
	order: integer().notNull(),
	path: text(),
	component: text(),
	query: text(),
	isFrame: integer("is_frame").default(1).notNull(),
	isCache: integer("is_cache").default(0).notNull(),
	visible: integer().default(0),
	status: integer().default(0),
	perms: varchar({ length: 100 }),
	icon: varchar({ length: 100 }),
	parentId: text(),
}, (table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "Menu_parentId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const product = pgTable("product", {
	id: text().primaryKey().notNull(),
	goodsSn: text("goods_sn").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	deleted: boolean().default(false).notNull(),
	slug: varchar({ length: 100 }).notNull(),
	title: varchar({ length: 100 }).default(''),
	subTitle: varchar("sub_title", { length: 100 }).default('').notNull(),
	keywords: text().notNull(),
	brief: text().notNull(),
	description: text().default(''),
	code: text().notNull(),
	flag: smallint().notNull(),
	brandId: text("brand_id").default('').notNull(),
	categoryId: text("category_id").default('').notNull(),
	customId: text("custom_id").notNull(),
	summary: text().default('').notNull(),
	content: text().notNull(),
	isOnSale: smallint("is_on_sale").default(1).notNull(),
	sort: smallint().default(100).notNull(),
	image: text().notNull(),
	picUrl: text("pic_url").default('').notNull(),
	shareUrl: text("share_url").default('').notNull(),
	isNew: smallint("is_new").default(0).notNull(),
	isHot: smallint("is_hot").default(0).notNull(),
	unit: varchar({ length: 31 }).default('件').notNull(),
	counterPrice: numeric("counter_price", { precision: 10, scale:  4 }).default('0.0000').notNull(),
	retailPrice: numeric("retail_price", { precision: 10, scale:  4 }).default('0.0000').notNull(),
	detail: text().notNull(),
	price: numeric({ precision: 10, scale:  4 }).notNull(),
	sku: varchar({ length: 100 }).notNull(),
	published: boolean().default(false).notNull(),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }).notNull(),
	bizType: smallint("biz_type").notNull(),
	postId: text(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
	name: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.brandId],
			foreignColumns: [brand.id],
			name: "product_brandId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [post.id],
			name: "product_postId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const sysConfig = pgTable("sys_config", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	key: text().notNull(),
	value: text().notNull(),
	type: integer().default(0).notNull(),
});

export const carousel = pgTable("Carousel", {
	id: text().primaryKey().notNull(),
	imgurl: text().default('').notNull(),
	title: text().default('').notNull(),
	url: text().default('').notNull(),
	description: text().default('').notNull(),
	status: text().default('').notNull(),
	remark: text().default('').notNull(),
	type: integer().notNull(),
	country: text().default('').notNull(),
	startAt: timestamp("start_at", { precision: 3, mode: 'string' }).notNull(),
	endAt: timestamp("end_at", { precision: 3, mode: 'string' }).notNull(),
	isAudit: smallint().default(0).notNull(),
	sort: smallint().default(0).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const poemTag = pgTable("poem_tag", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	nameZhHant: text("name_zh_Hant"),
	type: text(),
	typeZhHant: text("type_zh_Hant"),
	introduce: text(),
	introduceZhHant: text("introduce_zh_Hant"),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp({ precision: 3, mode: 'string' }),
}, (table) => [
	uniqueIndex("poem_tag_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const poemAuthor = pgTable("poem_author", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	nameZhHant: text("name_zh_Hant"),
	namePinYin: text(),
	introduce: text(),
	birthDate: integer(),
	deathDate: integer(),
	dynasty: text(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp({ precision: 3, mode: 'string' }),
});

export const productHistory = pgTable("product_history", {
	id: text().primaryKey().notNull(),
});

export const productSnapshot = pgTable("product_snapshot", {
	id: text().primaryKey().notNull(),
});

export const productCategory = pgTable("product_category", {
	id: text().primaryKey().notNull(),
	type: smallint().default(0).notNull(),
	title: text().notNull(),
	keywords: varchar({ length: 1023 }).default('').notNull(),
	description: text().default('').notNull(),
	pid: smallint().notNull(),
	status: smallint().default(1).notNull(),
	icons: text().default('').notNull(),
	picture: text().default('').notNull(),
	level: text().default('').notNull(),
	sort: smallint().default(50).notNull(),
});

export const collect = pgTable("collect", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	userId: smallint("user_id").default(0).notNull(),
	valueId: smallint("value_id").default(0).notNull(),
	type: smallint().default(0).notNull(),
});

export const productImage = pgTable("product_image", {
	id: text().primaryKey().notNull(),
});

export const productAttrKey = pgTable("product_attr_key", {
	id: text().primaryKey().notNull(),
	productId: smallint("product_id").default(0).notNull(),
	title: text().notNull(),
});

export const productAttrValue = pgTable("product_attr_value", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	attrKeyId: smallint("attr_key_id").default(0).notNull(),
	productId: smallint("product_id").default(0).notNull(),
	symbol: smallint().notNull(),
	value: text().notNull(),
});

export const payMethod = pgTable("pay_method", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").default('').notNull(),
	paymentType: text("payment_type").default('').notNull(),
	cardNumber: integer("card_number"),
	ownerName: text("owner_name").default(''),
	accountNumber: integer("account_number"),
	expirationDateMm: integer("expiration_date_mm"),
	expirationDateYy: integer("expiration_date_yy"),
	identificationDoc: text("identification_doc").default('').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("pay_method_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "pay_method_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const payInfo = pgTable("pay_info", {
	id: text().primaryKey().notNull(),
	userId: smallint("user_id").default(0).notNull(),
	payId: text("pay_id").notNull(),
	payStatus: smallint("pay_status").default(0).notNull(),
	payAt: timestamp("pay_at", { precision: 6, mode: 'string' }).notNull(),
	payPlatform: smallint("pay_platform").default(0).notNull(),
	payType: smallint("pay_type").default(0).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const order = pgTable("order", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	userId: text("user_id").default('').notNull(),
	orderSn: text("order_sn").default('').notNull(),
	status: smallint().default(0).notNull(),
	aftersaleStatus: smallint("aftersale_status").default(0).notNull(),
	consignee: text().default('').notNull(),
	phoneId: text("phone_id").default('').notNull(),
	addressId: smallint("address_id").default(0).notNull(),
	message: varchar({ length: 512 }).default('').notNull(),
	productPrice: numeric("product_price", { precision: 10, scale:  4 }).notNull(),
	freightPrice: numeric("freight_price", { precision: 10, scale:  4 }).notNull(),
	couponPrice: numeric("coupon_price", { precision: 10, scale:  4 }).notNull(),
	integralPrice: numeric("integral_price", { precision: 10, scale:  4 }).notNull(),
	grouponPrice: numeric("groupon_price", { precision: 10, scale:  4 }).notNull(),
	orderPrice: numeric("order_price", { precision: 10, scale:  4 }).notNull(),
	actualPrice: numeric("actual_price", { precision: 10, scale:  4 }).notNull(),
	payId: text("pay_id").default('').notNull(),
	paymentMethod: text().default('').notNull(),
	paymentAt: timestamp("payment_at", { precision: 6, mode: 'string' }).notNull(),
	sendAt: timestamp("send_at", { precision: 6, mode: 'string' }).notNull(),
	shipSn: text("ship_sn").default('').notNull(),
	shipChannel: text("ship_channel").default('').notNull(),
	shipAt: timestamp("ship_at", { precision: 6, mode: 'string' }).notNull(),
	refundAmount: numeric("refund_amount", { precision: 10, scale:  4 }).notNull(),
	refundType: text("refund_type").default('').notNull(),
	refundContent: text("refund_content").default('').notNull(),
	refundAt: timestamp("refund_at", { precision: 6, mode: 'string' }).notNull(),
	confirmAt: timestamp("confirm_at", { precision: 6, mode: 'string' }).notNull(),
	comments: smallint().default(0).notNull(),
	endAt: timestamp("end_at", { precision: 6, mode: 'string' }).notNull(),
	closedAt: timestamp("closed_at", { precision: 6, mode: 'string' }).notNull(),
	customerId: text().default(''),
	discount: doublePrecision(),
	annotation: text().default(''),
	totalPrice: integer(),
}, (table) => [
	uniqueIndex("order_pay_id_key").using("btree", table.payId.asc().nullsLast().op("text_ops")),
	uniqueIndex("order_phone_id_key").using("btree", table.phoneId.asc().nullsLast().op("text_ops")),
	uniqueIndex("order_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customer.id],
			name: "order_customerId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "order_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const productSku = pgTable("product_sku", {
	id: text().primaryKey().notNull(),
	productId: text("product_id").notNull(),
	attrSymbolPath: text("attr_symbol_path").notNull(),
	price: numeric({ precision: 10, scale:  4 }).default('0.0000').notNull(),
	stock: smallint().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "product_sku_product_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const orderDetail = pgTable("order_detail", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").default(''),
	payId: text("pay_id").default(''),
	orderId: text().default('').notNull(),
	productSkuId: text().default('').notNull(),
	productName: text().default('').notNull(),
	productPic: text().default('').notNull(),
	unitPrice: numeric({ precision: 10, scale:  4 }).notNull(),
	quantity: smallint().default(0),
	totalPrice: numeric({ precision: 10, scale:  4 }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("order_detail_pay_id_key").using("btree", table.payId.asc().nullsLast().op("text_ops")),
	uniqueIndex("order_detail_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [order.id],
			name: "order_detail_orderId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.productSkuId],
			foreignColumns: [productSku.id],
			name: "order_detail_productSkuId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const invoice = pgTable("invoice", {
	id: text().primaryKey().notNull(),
});

export const address = pgTable("address", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	name: text().default('').notNull(),
	userId: text("user_id").notNull(),
	conuntry: text().notNull(),
	province: text().notNull(),
	city: text().notNull(),
	county: text().notNull(),
	street: text().notNull(),
	detail: varchar({ length: 127 }).notNull(),
	address1: text("address_1"),
	address2: text("address_2"),
	areaCode: varchar("area_code", { length: 6 }).notNull(),
	postcode: varchar({ length: 6 }).notNull(),
	zip: integer(),
	mobile: varchar({ length: 20 }).notNull(),
	isDefault: boolean("is_default").default(false).notNull(),
	customerId: text("customer_id").notNull(),
	telephoneId: text().default('').notNull(),
	phoneId: text().default('').notNull(),
}, (table) => [
	uniqueIndex("address_phoneId_key").using("btree", table.phoneId.asc().nullsLast().op("text_ops")),
	uniqueIndex("address_telephoneId_key").using("btree", table.telephoneId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customer.id],
			name: "address_customer_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.telephoneId],
			foreignColumns: [telephone.id],
			name: "address_telephoneId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const taobaoOrderRaw = pgTable("taobao_order_raw", {
	id: text().primaryKey().notNull(),
	buyerName: text().default('').notNull(),
	buyerNick: text().default('').notNull(),
	payId: text().default('').notNull(),
	payDetail: text().default('').notNull(),
	tradePayable: numeric({ precision: 10, scale:  2 }).notNull(),
	postage: numeric({ precision: 10, scale:  2 }).notNull(),
	integration: smallint().notNull(),
	total: numeric({ precision: 10, scale:  2 }).notNull(),
	rebateIntegration: smallint().notNull(),
	realTotal: numeric({ precision: 10, scale:  2 }).notNull(),
	realIntegration: smallint().notNull(),
	status: text().default('').notNull(),
	message: text().default('').notNull(),
	receiver: text().default('').notNull(),
	address: text().default('').notNull(),
	deliveryMode: text().default('').notNull(),
	telephone: text().default('').notNull(),
	cellphone: text().default('').notNull(),
	virtualNumberExpirationAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	orderCreatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	payAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	goodsTitle: text().default('').notNull(),
	goodsType: smallint().notNull(),
	deliveryOrder: text().default('').notNull(),
	deliveryCompany: text().default('').notNull(),
	orderNote: text().default('').notNull(),
	goodsCount: smallint().default(0).notNull(),
	shopId: text().default('').notNull(),
	shopName: text().default('').notNull(),
	closedReason: text().default('').notNull(),
	sellerSerivce: smallint().default(0).notNull(),
	buyerService: smallint().default(0).notNull(),
	invoiceTitle: text().default('').notNull(),
	isCellphoneOrder: text().default('').notNull(),
	stagingOrderInfo: text().default('').notNull(),
	privilegeDownPaymentOderId: smallint().default(0).notNull(),
	isUploadContractPicture: smallint().default(0).notNull(),
	isUploadInvoicePicture: smallint().default(0).notNull(),
	isPayForAnother: smallint().default(0).notNull(),
	downPaymentRank: smallint().default(0).notNull(),
	modifiedSku: text().default('').notNull(),
	modifiedAddress: text().default('').notNull(),
	exceptionMessage: text().default('').notNull(),
	tmallCouponDeduction: smallint().default(0).notNull(),
	integrationDeduction: smallint().default(0).notNull(),
	isO2OOrder: smallint().default(0).notNull(),
	newRetailTradeType: text().default('').notNull(),
	newRetailGuideShopName: text().default('').notNull(),
	newRetailGuideShopId: text().default('').notNull(),
	newRetailDeliverShopName: text().default('').notNull(),
	newRetailDeliverShopId: text().default('').notNull(),
	refundAmount: numeric({ precision: 10, scale:  2 }).notNull(),
	appointmentShop: text().default('').notNull(),
	confirmReceiptAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	remitNum: numeric({ precision: 10, scale:  2 }).notNull(),
	personalRedEnvelope: text().default('').notNull(),
	isCreditBuy: smallint().default(0).notNull(),
	experienceEndAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	topNgift: text().default('').notNull(),
	deliveryType: text().default('').notNull(),
	liveCashbackStatus: text().default('').notNull(),
	cashbackAmount: smallint().default(0).notNull(),
	slowDeliveryCompensate: smallint().default(0).notNull(),
	newRetailDealShopName: text().default('').notNull(),
	newRetailDealShopId: text().default('').notNull(),
	newRetailDealDealerId: text().default('').notNull(),
	isPresell: smallint().default(0).notNull(),
	deliveryAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	comment: text().default('').notNull(),
	masterOrderId: text().default('').notNull(),
});

export const customer = pgTable("customer", {
	id: text().primaryKey().notNull(),
	firstName: text(),
	lastName: text(),
	phone: text(),
	email: text(),
	addressId: text(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const cart = pgTable("cart", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	productId: text("product_id").notNull(),
	productSn: text("product_sn").notNull(),
	productName: varchar("product_name", { length: 127 }).notNull(),
	price: numeric({ precision: 10, scale:  4 }).default('0.0000').notNull(),
	number: smallint().default(0).notNull(),
	specifications: varchar({ length: 1023 }).notNull(),
	isChecked: boolean("is_checked").default(true).notNull(),
	pictures: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "cart_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const store = pgTable("Store", {
	id: text().primaryKey().notNull(),
	level: text().default('').notNull(),
	imgurl: text().default('').notNull(),
	title: text().default('').notNull(),
	description: text().default('').notNull(),
	phoneId: text("phone_id").default('').notNull(),
	city: text().default('').notNull(),
	detail: text().default('').notNull(),
	startTime: text().default('').notNull(),
	endTime: text().default('').notNull(),
	scopeList: text().default('').notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("Store_phone_id_key").using("btree", table.phoneId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.phoneId],
			foreignColumns: [telephone.id],
			name: "Store_phone_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const aftersale = pgTable("aftersale", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	aftersalSn: text("aftersal_sn").default('').notNull(),
	orderId: text("order_id").default('').notNull(),
	userId: text("user_id").default('').notNull(),
	type: smallint().default(0).notNull(),
	reason: varchar({ length: 31 }).default('').notNull(),
	amount: numeric({ precision: 10, scale:  4 }).notNull(),
	pictures: text().default('').notNull(),
	comment: text().default('').notNull(),
	status: smallint().default(0).notNull(),
	handleAt: timestamp("handle_at", { precision: 6, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("aftersale_order_id_key").using("btree", table.orderId.asc().nullsLast().op("text_ops")),
	uniqueIndex("aftersale_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const ad = pgTable("ad", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	title: text().default('').notNull(),
	link: text().default('').notNull(),
	position: varchar({ length: 100 }).default('1').notNull(),
	content: text().default('').notNull(),
	startAt: timestamp("start_at", { precision: 6, mode: 'string' }).notNull(),
	endAt: timestamp("end_at", { precision: 6, mode: 'string' }).notNull(),
	enabled: boolean().default(false).notNull(),
});

export const page = pgTable("page", {
	id: text().primaryKey().notNull(),
	slug: text().default('').notNull(),
}, (table) => [
	uniqueIndex("page_slug_key").using("btree", table.slug.asc().nullsLast().op("text_ops")),
]);

export const brand = pgTable("brand", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	title: text().default('').notNull(),
	description: text().default('').notNull(),
	pictures: text().default('').notNull(),
	icon: text().default(''),
	banner: text().default(''),
	video: text().default(''),
	counterViews: integer("counter_views").default(0),
	status: text().default('').notNull(),
	sort: smallint().default(50).notNull(),
	floorPrice: numeric("floor_price", { precision: 10, scale:  4 }).default('0.0000').notNull(),
});

export const notification = pgTable("Notification", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	senderId: text().notNull(),
	deletedAt: timestamp({ precision: 3, mode: 'string' }),
	entityId: text(),
	entityType: text().notNull(),
	metaData: jsonb(),
	readAt: timestamp({ precision: 3, mode: 'string' }),
	recipientId: text().notNull(),
});

export const stripeTransaction = pgTable("StripeTransaction", {
	sessionId: text().primaryKey().notNull(),
	transactionId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.transactionId],
			foreignColumns: [creditTransaction.id],
			name: "StripeTransaction_transactionId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const comment = pgTable("comment", {
	body: text().notNull(),
	postId: text(),
	id: text().primaryKey().notNull(),
	commentPostId: text("comment_post_id").default('').notNull(),
	commentAuthor: text("comment_author").default('').notNull(),
	commentAuthorEmail: text("comment_author_email").default('').notNull(),
	commentAuthorUrl: text("comment_author_url").default('').notNull(),
	commentAuthorIp: text("comment_author_ip").default('').notNull(),
	commentDate: timestamp("comment_date", { precision: 6, mode: 'string' }).notNull(),
	commentDateGmt: timestamp("comment_date_gmt", { precision: 6, mode: 'string' }).notNull(),
	commentKarma: smallint("comment_karma").notNull(),
	commentApproved: smallint("comment_approved").notNull(),
	commentAgent: text("comment_agent").default('').notNull(),
	commentType: text("comment_type").default('').notNull(),
	commentParent: smallint("comment_parent").notNull(),
	userId: text("user_id").default('').notNull(),
	type: smallint().default(0).notNull(),
	replay: varchar({ length: 511 }).default('').notNull(),
	hasPicture: smallint("has_picture").default(0).notNull(),
	picUrls: varchar({ length: 1023 }).default('').notNull(),
	star: smallint().default(0).notNull(),
	valueId: text("value_id").default('').notNull(),
	content: text().default('').notNull(),
	htmlContent: text().default('').notNull(),
	adminContent: varchar("admin_content", { length: 1023 }).default('').notNull(),
	status: commentStatus().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	parentId: text().notNull(),
	rootId: text().notNull(),
	latest: text().notNull(),
	commentCount: integer().notNull(),
	likedCount: integer().notNull(),
	sourceId: integer().notNull(),
	articleId: text(),
}, (table) => [
	uniqueIndex("comment_comment_post_id_key").using("btree", table.commentPostId.asc().nullsLast().op("text_ops")),
	uniqueIndex("comment_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	uniqueIndex("comment_value_id_key").using("btree", table.valueId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [article.id],
			name: "comment_articleId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [post.id],
			name: "comment_postId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comment_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const postAuthor = pgTable("post_author", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
});

export const postCategory = pgTable("post_category", {
	id: text().primaryKey().notNull(),
	postId: text("post_id").notNull(),
	categoryId: text("category_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
});

export const tag = pgTable("tag", {
	id: text().primaryKey().notNull(),
	articleId: text(),
}, (table) => [
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [article.id],
			name: "tag_articleId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const topic = pgTable("topic", {
	id: text().primaryKey().notNull(),
	uid: text().notNull(),
	name: text().default('').notNull(),
	useCount: integer("use_count").default(0).notNull(),
	userId: text("user_id").default('').notNull(),
	isDelete: boolean("is_delete").default(false).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	description: text().notNull(),
	category: text().notNull(),
	relateTopics: text("relate_topics").notNull(),
	filename: text().notNull(),
	views: integer().notNull(),
	isPublished: boolean().notNull(),
}, (table) => [
	uniqueIndex("topic_uid_key").using("btree", table.uid.asc().nullsLast().op("text_ops")),
]);

export const storage = pgTable("storage", {
	id: text().primaryKey().notNull(),
	key: text().default('').notNull(),
	name: text().default('').notNull(),
	type: varchar({ length: 20 }).default('').notNull(),
	size: smallint().notNull(),
	url: text().default('').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDelete: boolean("is_delete").default(false).notNull(),
});

export const system = pgTable("system", {
	id: text().primaryKey().notNull(),
	keyName: text("key_name").default('').notNull(),
	keyValue: text("key_value").default('').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDelete: boolean("is_delete").default(false).notNull(),
});

export const region = pgTable("Region", {
	id: text().primaryKey().notNull(),
	pid: text().default('').notNull(),
	name: varchar({ length: 120 }).default('').notNull(),
	type: integer().notNull(),
	code: smallint().notNull(),
});

export const creditTransaction = pgTable("CreditTransaction", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: text().notNull(),
	amount: doublePrecision().notNull(),
	type: transactionType().notNull(),
	status: transactionStatus().default('SUCCESS').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "CreditTransaction_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const photo = pgTable("photo", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 500 }).notNull(),
	description: text().notNull(),
	filename: text().notNull(),
	views: integer().notNull(),
	isPublished: boolean().notNull(),
});

export const message = pgTable("message", {
	id: text().primaryKey().notNull(),
});

export const access = pgTable("access", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	moduleName: varchar("module_name", { length: 50 }),
	type: integer(),
	actionName: varchar("action_name", { length: 100 }),
	apiName: varchar("api_name", { length: 100 }),
	icon: varchar({ length: 100 }),
	url: varchar({ length: 100 }),
	method: varchar({ length: 10 }),
	parentId: text("parent_id").notNull(),
	sort: integer().default(1).notNull(),
	status: integer().default(1),
	description: varchar({ length: 100 }),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
}, (table) => [
	uniqueIndex("action_name_delete_at").using("btree", table.actionName.asc().nullsLast().op("bool_ops"), table.isDeleted.asc().nullsLast().op("bool_ops")),
	uniqueIndex("module_name_delete_at").using("btree", table.moduleName.asc().nullsLast().op("text_ops"), table.isDeleted.asc().nullsLast().op("text_ops")),
]);

export const accountLastLogin = pgTable("account_last_login", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	lastLoginIp: text("last_login_ip").default(''),
	lastLoginAddress: varchar("last_login_address", { length: 100 }).default(''),
	lastLoginTime: timestamp("last_login_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const accountToken = pgTable("account_token", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	token: text().notNull(),
	username: text().notNull(),
	mobile: text().notNull(),
	email: text().notNull(),
	platform: text().notNull(),
	isSuper: integer().notNull(),
	expireTime: timestamp({ precision: 3, mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
});

export const accountRole = pgTable("account_role", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	accountId: text("account_id").notNull(),
	roleId: text("role_id").notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
}, (table) => [
	uniqueIndex("account_role_deleted").using("btree", table.accountId.asc().nullsLast().op("bool_ops"), table.roleId.asc().nullsLast().op("text_ops"), table.isDeleted.asc().nullsLast().op("bool_ops")),
]);

export const accounts = pgTable("accounts", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	refreshTokenExpiresIn: integer("refresh_token_expires_in"),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
	username: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 100 }).notNull(),
	mobile: varchar({ length: 11 }),
	email: varchar({ length: 50 }),
	avatar: text().default('').notNull(),
	status: integer().default(1),
	platform: integer().default(0),
	isSuper: integer().default(0).notNull(),
}, (table) => [
	index("accounts_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("accounts_mobile_idx").using("btree", table.mobile.asc().nullsLast().op("text_ops")),
	uniqueIndex("accounts_provider_provider_account_id_key").using("btree", table.provider.asc().nullsLast().op("text_ops"), table.providerAccountId.asc().nullsLast().op("text_ops")),
	index("accounts_username_idx").using("btree", table.username.asc().nullsLast().op("text_ops")),
	uniqueIndex("accounts_username_mobile_email_key").using("btree", table.username.asc().nullsLast().op("text_ops"), table.mobile.asc().nullsLast().op("text_ops"), table.email.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const company = pgTable("company", {
	id: text().primaryKey().notNull(),
	name: text().default('').notNull(),
	enName: text("en_name").default('').notNull(),
	formerName: text("former_name").default('').notNull(),
	type: smallint().default(0).notNull(),
	registryAt: timestamp("registry_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	registryAddress: text("registry_address").default('').notNull(),
	identifier: text().default('').notNull(),
	legalEntity: text("legal_entity").default('').notNull(),
	property: smallint().default(0).notNull(),
	chairman: smallint().default(0).notNull(),
	location: text().default('').notNull(),
	address: text().default('').notNull(),
	hasBranch: integer("has_branch").default(0).notNull(),
	staffSize: smallint("staff_size").default(1).notNull(),
	registeredCapital: smallint("registered_capital").default(0).notNull(),
	link: text().default('').notNull(),
	email: text().default('').notNull(),
	classificationId: text("classification_id").notNull(),
}, (table) => [
	uniqueIndex("company_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("company_link_key").using("btree", table.link.asc().nullsLast().op("text_ops")),
]);

export const industrialClassification = pgTable("industrial_classification", {
	id: text().primaryKey().notNull(),
	industryId: text("industry_id").default('').notNull(),
	name: text().default('').notNull(),
	parentId: text("parent_id").default(''),
	levelType: integer("level_type").notNull(),
	pinyin: text().default('').notNull(),
	description: text().default('').notNull(),
	sortOrder: integer("sort_order").notNull(),
	status: integer().notNull(),
});

export const organization = pgTable("organization", {
	id: text().primaryKey().notNull(),
	login: text().default('').notNull(),
	nodeId: text("node_id").default('').notNull(),
	url: text().default('').notNull(),
	reposUrl: text("repos_url").default('').notNull(),
	eventsUrl: text("events_url").default('').notNull(),
	hooksUrl: text("hooks_url").default('').notNull(),
	issuesUrl: text("issues_url").default('').notNull(),
	membersUrl: text("members_url").default('').notNull(),
	publicMembersUrl: text("public_members_url").default('').notNull(),
	avatarUrl: text("avatar_url").default('').notNull(),
	description: text().default('').notNull(),
	name: text().default('').notNull(),
	company: text().default('').notNull(),
	blog: text().default('').notNull(),
	location: text().default('').notNull(),
	email: text().default('').notNull(),
	twitterUsername: text("twitter_username").default('').notNull(),
	isVerified: integer("is_verified").notNull(),
	hasOrganizationProjects: integer("has_organization_projects").notNull(),
	hasRepositoryProjects: integer("has_repository_projects").notNull(),
	publicRepos: smallint("public_repos").notNull(),
	publicGists: smallint("public_gists").notNull(),
	followers: smallint().notNull(),
	following: smallint().notNull(),
	htmlUrl: text("html_url").notNull(),
	type: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("organization_blog_key").using("btree", table.blog.asc().nullsLast().op("text_ops")),
	uniqueIndex("organization_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const category = pgTable("category", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	title: text().default('').notNull(),
	type: integer().default(0).notNull(),
	status: text().default('').notNull(),
	description: text().default('').notNull(),
	slug: text().notNull(),
	keywords: text().default('').notNull(),
	pid: integer().default(0).notNull(),
	iconUrl: text("icon_url").default('').notNull(),
	picUrl: text("pic_url").default('').notNull(),
	level: text().default('L1').notNull(),
	sort: integer().default(50).notNull(),
	articleId: text(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
	label: text().notNull(),
	value: text().notNull(),
	order: integer().notNull(),
	onlyChild: boolean().default(false).notNull(),
	parentId: text(),
}, (table) => [
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [article.id],
			name: "category_articleId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "category_parentId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const depts = pgTable("depts", {
	id: text().primaryKey().notNull(),
	parentId: text().notNull(),
	name: text().notNull(),
	sort: integer().default(0).notNull(),
	leader: text(),
	phone: text(),
	email: text(),
	status: integer().default(0).notNull(),
	delFlag: integer().default(0).notNull(),
	deptId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.deptId],
			foreignColumns: [table.id],
			name: "depts_deptId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const roleAccess = pgTable("role_access", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	roleId: text("role_id").notNull(),
	accessId: text("access_id").notNull(),
	type: integer().notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
}, (table) => [
	uniqueIndex("role_access_type_deleted").using("btree", table.roleId.asc().nullsLast().op("int4_ops"), table.accessId.asc().nullsLast().op("int4_ops"), table.type.asc().nullsLast().op("int4_ops"), table.isDeleted.asc().nullsLast().op("int4_ops")),
]);

export const profile = pgTable("profile", {
	id: text().primaryKey().notNull(),
	bio: text().default(''),
});

export const localAuth = pgTable("LocalAuth", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	username: text().notNull(),
	password: text().notNull(),
});

export const oauth = pgTable("OAuth", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	oauthName: text("oauth_name").notNull(),
	oauthId: text("oauth_id").notNull(),
	oauthAccessToken: text("oauth_access_token").notNull(),
	oauthExpires: integer("oauth_expires").notNull(),
});

export const samlAuth = pgTable("SAMLAuth", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	apiKey: text("api_key").notNull(),
	apiSecret: text("api_secret").notNull(),
});

export const permission = pgTable("permission", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	uniqueIndex("permission_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const userToResume = pgTable("user_to_resume", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	resumeId: text().notNull(),
});

export const resume = pgTable("resume", {
	id: text().primaryKey().notNull(),
});

export const telephone = pgTable("Telephone", {
	id: text().primaryKey().notNull(),
	number: text().default('').notNull(),
	regionCode: text("region_code").default('').notNull(),
	countryCode: text("country_code").default('').notNull(),
	userId: text("user_id").default('').notNull(),
}, (table) => [
	uniqueIndex("Telephone_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "Telephone_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const client = pgTable("client", {
	id: text().primaryKey().notNull(),
	name: text().default('').notNull(),
	taobao: text().default('').notNull(),
	alipay: text().default('').notNull(),
	contact: text().default('').notNull(),
	phone: text().default('').notNull(),
	lastOrder: timestamp("last_order", { precision: 3, mode: 'string' }),
}, (table) => [
	uniqueIndex("client_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const verificationtokens = pgTable("verificationtokens", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("verificationtokens_identifier_token_key").using("btree", table.identifier.asc().nullsLast().op("text_ops"), table.token.asc().nullsLast().op("text_ops")),
]);

export const feedback = pgTable("feedback", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	userId: text("user_id").default('').notNull(),
	username: text().default('').notNull(),
	feedType: text("feed_type").default('').notNull(),
	telephoneId: text("telephone_id").default('').notNull(),
	mobile: varchar({ length: 20 }).default('').notNull(),
	content: varchar({ length: 1023 }).default('').notNull(),
	status: smallint().default(0).notNull(),
	hasPicture: integer("has_picture").default(0).notNull(),
	picUtls: varchar("pic_utls", { length: 1023 }).default('').notNull(),
}, (table) => [
	uniqueIndex("feedback_telephone_id_key").using("btree", table.telephoneId.asc().nullsLast().op("text_ops")),
	uniqueIndex("feedback_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.telephoneId],
			foreignColumns: [telephone.id],
			name: "feedback_telephone_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const options = pgTable("options", {
	id: text().primaryKey().notNull(),
	optionName: text("option_name").notNull(),
	optionValue: text("option_value").notNull(),
	userLogin: text("user_login").notNull(),
});

export const coupon = pgTable("coupon", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	title: text().default('').notNull(),
	description: text().default('').notNull(),
	code: text().default('').notNull(),
	discount: numeric({ precision: 10, scale:  4 }).default('0.0000').notNull(),
	type: smallint().notNull(),
	limit: smallint().default(1).notNull(),
	min: numeric({ precision: 10, scale:  4 }).notNull(),
	condition: smallint().notNull(),
	goodsType: smallint("goods_type").default(0).notNull(),
	goodsValue: varchar("goods_value", { length: 1023 }).default('').notNull(),
	total: smallint().default(0).notNull(),
	userdCount: smallint("userd_count").notNull(),
	timeType: smallint("time_type").default(0).notNull(),
	status: smallint().default(0).notNull(),
	expiration: timestamp({ precision: 3, mode: 'string' }).notNull(),
	days: smallint().default(0).notNull(),
	startAt: timestamp("start_at", { precision: 3, mode: 'string' }).notNull(),
	endAt: timestamp("end_at", { precision: 3, mode: 'string' }).notNull(),
	tag: text().default('').notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
	maxReceiveCount: integer("max_receive_count").notNull(),
	count: integer().notNull(),
});

export const couponUsed = pgTable("coupon_used", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	couponId: text("coupon_id").default('').notNull(),
	userId: text("user_id").default('').notNull(),
	orderId: text("order_id").default('').notNull(),
	usedAt: timestamp("used_at", { precision: 3, mode: 'string' }).notNull(),
	status: smallint().default(0).notNull(),
	startAt: timestamp("start_at", { precision: 3, mode: 'string' }).notNull(),
	endAt: timestamp("end_at", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("coupon_used_coupon_id_key").using("btree", table.couponId.asc().nullsLast().op("text_ops")),
	uniqueIndex("coupon_used_order_id_key").using("btree", table.orderId.asc().nullsLast().op("text_ops")),
	uniqueIndex("coupon_used_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const groupon = pgTable("groupon", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	orderId: text("order_id").default('').notNull(),
	grouponId: text("groupon_id").default('').notNull(),
	rulesId: text("rules_id").default('').notNull(),
	userId: text("user_id").default('').notNull(),
	shareUrl: text("share_url").default('').notNull(),
	creatorUserId: text("creator_user_id").default('').notNull(),
	creatorUserAt: timestamp("creator_user_at", { precision: 3, mode: 'string' }).notNull(),
	status: smallint().default(0).notNull(),
}, (table) => [
	uniqueIndex("groupon_creator_user_id_key").using("btree", table.creatorUserId.asc().nullsLast().op("text_ops")),
	uniqueIndex("groupon_groupon_id_key").using("btree", table.grouponId.asc().nullsLast().op("text_ops")),
	uniqueIndex("groupon_order_id_key").using("btree", table.orderId.asc().nullsLast().op("text_ops")),
	uniqueIndex("groupon_rules_id_key").using("btree", table.rulesId.asc().nullsLast().op("text_ops")),
	uniqueIndex("groupon_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const grouponRules = pgTable("groupon_rules", {
	id: text().primaryKey().notNull(),
	goodsId: text("goods_id").default('').notNull(),
	goodsName: varchar("goods_name", { length: 127 }).default('').notNull(),
	picUrl: text("pic_url").default('').notNull(),
	discount: numeric({ precision: 63, scale:  0 }).notNull(),
	discountMember: smallint("discount_member").notNull(),
	expireAt: timestamp("expire_at", { precision: 3, mode: 'string' }).notNull(),
	status: smallint().default(0).notNull(),
}, (table) => [
	uniqueIndex("groupon_rules_goods_id_key").using("btree", table.goodsId.asc().nullsLast().op("text_ops")),
]);

export const collection = pgTable("collection", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	userId: text("user_id").default('').notNull(),
	valueId: text("value_id").default('').notNull(),
	type: smallint().default(0).notNull(),
	articleId: text("article_id"),
}, (table) => [
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [article.id],
			name: "collection_article_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const issue = pgTable("issue", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	title: text().notNull(),
	answer: varchar({ length: 1023 }).notNull(),
});

export const footprint = pgTable("footprint", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	userId: text("user_id").default('').notNull(),
	productId: text("product_id").default('').notNull(),
}, (table) => [
	uniqueIndex("footprint_product_id_key").using("btree", table.productId.asc().nullsLast().op("text_ops")),
	uniqueIndex("footprint_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const searchHistory = pgTable("SearchHistory", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").default('').notNull(),
	keyword: text().default('').notNull(),
	from: text().default('').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	uniqueIndex("SearchHistory_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const productKeyword = pgTable("product_keyword", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	keyword: text().default('').notNull(),
	url: text().default('').notNull(),
	isHot: smallint("is_hot").default(0).notNull(),
	isDefault: smallint("is_default").default(0).notNull(),
	sort: smallint().default(0).notNull(),
});

export const log = pgTable("log", {
	id: text().primaryKey().notNull(),
	traceId: text("trace_id").notNull(),
	userId: text("user_id").notNull(),
	userType: text("user_type").notNull(),
	ip: varchar({ length: 45 }).default('').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	module: text().notNull(),
	type: smallint().notNull(),
	name: varchar({ length: 45 }).default('').notNull(),
	content: text().notNull(),
	status: integer().notNull(),
	result: varchar({ length: 127 }).default('').notNull(),
	exts: jsonb().notNull(),
	requestMethod: text("request_method").notNull(),
	requestUrl: text("request_url").notNull(),
	userAgent: text("user_agent").notNull(),
	methodName: text("method_name").notNull(),
	methodArgs: text("method_args").notNull(),
	startAt: timestamp("start_at", { precision: 3, mode: 'string' }).notNull(),
	duration: integer().notNull(),
	resultCode: integer("result_code").notNull(),
	resultMsg: varchar("result_msg", { length: 127 }).notNull(),
	resultData: jsonb("result_data").notNull(),
});

export const loginLog = pgTable("login_log", {
	id: text().primaryKey().notNull(),
	logType: integer("log_type").notNull(),
	traceId: text("trace_id").notNull(),
	userId: text("user_id").notNull(),
	userType: text("user_type").notNull(),
	username: text().notNull(),
	ip: text().notNull(),
	result: text().notNull(),
	userAgent: text("user_agent").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const notice = pgTable("notice", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	title: text().default('').notNull(),
	content: varchar({ length: 511 }).default('').notNull(),
	adminId: text("admin_id").default('').notNull(),
}, (table) => [
	uniqueIndex("notice_admin_id_key").using("btree", table.adminId.asc().nullsLast().op("text_ops")),
]);

export const noticeAdmin = pgTable("notice_admin", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	noticeId: text("notice_id").default('').notNull(),
	noticeTitle: text("notice_title").default('').notNull(),
	adminId: text("admin_id").default('').notNull(),
	readAt: timestamp("read_at", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("notice_admin_notice_id_key").using("btree", table.noticeId.asc().nullsLast().op("text_ops")),
]);

export const selfHeatingBo = pgTable("self_heating_bo", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	innerCode: text("inner_code").notNull(),
	type: smallint().notNull(),
	code: text().notNull(),
	outBoxType: smallint("out_box_type").notNull(),
	innerBoxType: smallint("inner_box_type").notNull(),
	materialType: smallint("material_type").notNull(),
	color: smallint().notNull(),
	outBoxCapacity: smallint("out_box_capacity").notNull(),
	innerBoxCapacity: smallint("inner_box_capacity").notNull(),
	innerBoxCapacityLine: smallint("inner_box_capacity_line").notNull(),
	innerBoxCapacity2: smallint("inner_box_capacity2").notNull(),
	innerBoxCapacity3: smallint("inner_box_capacity3").notNull(),
	innerBoxCapacity4: smallint("inner_box_capacity4").notNull(),
	outBoxSize: smallint("out_box_size").notNull(),
	innerBoxSize: smallint("inner_box_size").notNull(),
	outBoxSizeX: smallint("out_box_size_x").notNull(),
	innerBoxSizeX: smallint("inner_box_size_x").notNull(),
	outBoxSizeY: smallint("out_box_size_y").notNull(),
	innerBoxSizeY: smallint("inner_box_size_y").notNull(),
	outBoxSizeZ: smallint("out_box_size_z").notNull(),
	innerBoxSizeZ: smallint("inner_box_size_z").notNull(),
	lidWeights: smallint("lid_weights").notNull(),
	bottomWeight: smallint("bottom_weight").notNull(),
	innerWeight: smallint("inner_weight").notNull(),
	cost: smallint().notNull(),
}, (table) => [
	uniqueIndex("self_heating_bo_inner_code_key").using("btree", table.innerCode.asc().nullsLast().op("text_ops")),
]);

export const heatingBag = pgTable("heating_bag", {
	id: text().primaryKey().notNull(),
	weight: smallint().notNull(),
	cost: smallint().notNull(),
	company: smallint().notNull(),
});

export const subscribesWebhook = pgTable("subscribes_webhook", {
	id: text().primaryKey().notNull(),
	webhook: text().default('').notNull(),
	secret: text().default('').notNull(),
	webhookType: text("webhook_type").default('').notNull(),
	remindSource: sourceEnum("remind_source").notNull(),
	remindType: text("remind_type").default('').notNull(),
}, (table) => [
	uniqueIndex("subscribes_webhook_webhook_remind_source_key").using("btree", table.webhook.asc().nullsLast().op("text_ops"), table.remindSource.asc().nullsLast().op("text_ops")),
]);

export const subscribesWebhook2User = pgTable("subscribes_webhook_2_user", {
	id: text().primaryKey().notNull(),
	webhookId: text("webhook_id").default('').notNull(),
	userId: text("user_id").default('').notNull(),
});

export const freelancerTask = pgTable("freelancer_task", {
	id: text().primaryKey().notNull(),
	source: sourceEnum().notNull(),
	sourceId: text("source_id").notNull(),
	title: text().default('').notNull(),
	desc: text().default('').notNull(),
	minPrice: numeric({ precision: 10, scale:  0 }).default('0').notNull(),
	maxPrice: numeric({ precision: 10, scale:  0 }).default('0').notNull(),
	fixedPrice: text("fixed_price").default('').notNull(),
	bargain: boolean().default(false).notNull(),
	cycle: smallint().default(0).notNull(),
	cycleName: text("cycle_name").default('天').notNull(),
	date: timestamp({ precision: 6, mode: 'string' }).notNull(),
	url: text().default('').notNull(),
	applyCount: smallint("apply_count").default(0).notNull(),
	visitCount: smallint("visit_count").default(0).notNull(),
	status: text().default('').notNull(),
	auditStatus: smallint("audit_status").default(0).notNull(),
	auditReason: text("audit_reason").default('').notNull(),
	auditAt: timestamp("audit_at", { precision: 6, mode: 'string' }).notNull(),
	handleStatus: smallint().default(0).notNull(),
	handleAt: timestamp("handle_at", { precision: 6, mode: 'string' }).notNull(),
	userId: text("user_id").default('').notNull(),
	userName: text("user_name").default('').notNull(),
	userUrl: text("user_url").default('').notNull(),
	type: smallint().default(0).notNull(),
	application: smallint().default(0).notNull(),
	tags: text().default('').notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("freelancer_task_source_title_key").using("btree", table.source.asc().nullsLast().op("text_ops"), table.title.asc().nullsLast().op("text_ops")),
	uniqueIndex("freelancer_task_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);

export const freeProject = pgTable("free_project", {
	id: text().primaryKey().notNull(),
	webhook: text().default('').notNull(),
	content: text().default('').notNull(),
	price: text().default('').notNull(),
	duration: smallint().notNull(),
	time: timestamp({ precision: 6, mode: 'string' }).notNull(),
	origin: text().default('').notNull(),
	url: text().default('').notNull(),
	originId: text("origin_id").default(''),
	status: text().default(''),
	applyCount: smallint("apply_count").default(0),
	visitCount: smallint("visit_count").default(0),
	developerType: smallint("developer_type"),
	specificRole: smallint("specific_role"),
	type: text().default(''),
	bargain: boolean(),
}, (table) => [
	uniqueIndex("free_project_origin_origin_id_key").using("btree", table.origin.asc().nullsLast().op("text_ops"), table.originId.asc().nullsLast().op("text_ops")),
]);

export const opensourceProjectCategroy = pgTable("opensource_project_categroy", {
	id: text().primaryKey().notNull(),
	name: text().default('').notNull(),
});

export const opensourceProjectField = pgTable("opensource_project_field", {
	id: text().primaryKey().notNull(),
	cid: text().default('').notNull(),
	name: text().default('').notNull(),
});

export const opensourceLicense = pgTable("opensource_license", {
	id: text().primaryKey().notNull(),
	name: text().default('').notNull(),
	url: text().default('').notNull(),
});

export const opensourceProject = pgTable("opensource_project", {
	id: text().primaryKey().notNull(),
	cid: text().default('').notNull(),
	fid: text().default('').notNull(),
	name: text().default('').notNull(),
	description: text().default('').notNull(),
	githubUrl: text().default('').notNull(),
	githubStars: integer("github_stars").notNull(),
	opensourceLicense: integer("opensource_license").notNull(),
	link: text().default('').notNull(),
	lastUpdate: timestamp({ precision: 6, mode: 'string' }).notNull(),
	version: text().default('').notNull(),
	opensourceLicenseId: text().default('').notNull(),
});

export const book = pgTable("book", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 200 }).notNull(),
	summary: varchar({ length: 500 }).notNull(),
	browserCount: integer("browser_count").notNull(),
	commentCount: integer("comment_count").notNull(),
	chapterCount: integer("chapter_count").notNull(),
	wordCount: integer("word_count").notNull(),
	studyUserCount: integer("study_user_count").notNull(),
	coverUrl: text("cover_url").notNull(),
	status: bookStatus().notNull(),
	starUserCount: integer("star_user_count").notNull(),
	star: integer().notNull(),
	content: text().notNull(),
	htmlContent: text("html_content").notNull(),
	contentType: articleContentType("content_type").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "book_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const bookCategory = pgTable("book_category", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 200 }).notNull(),
	sequence: integer().notNull(),
	parentId: text("parent_id").notNull(),
	pathname: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const bookChapter = pgTable("BookChapter", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 200 }).notNull(),
	wordContent: integer("word_content").notNull(),
	browserCount: integer("browser_count").notNull(),
	commentCount: integer("comment_count").notNull(),
	rootCommentCount: integer("root_comment_count").notNull(),
	content: text().notNull(),
	htmlContent: text("html_content").notNull(),
	contentType: articleContentType("content_type").notNull(),
	userId: text("user_id").notNull(),
	parentId: integer("parent_id").notNull(),
	bookId: text("book_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [book.id],
			name: "BookChapter_book_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "BookChapter_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const bookStar = pgTable("BookStar", {
	id: text().primaryKey().notNull(),
	htmlContent: text().notNull(),
	status: bookStarStatus().notNull(),
	star: integer().notNull(),
	bookId: text().notNull(),
	userId: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "BookStar_userId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const article = pgTable("article", {
	id: text().primaryKey().notNull(),
	lastCommentAt: timestamp("last_comment_at", { precision: 3, mode: 'string' }).notNull(),
	name: varchar({ length: 200 }).notNull(),
	browseCount: integer("browse_count").notNull(),
	commentCount: integer("comment_count").notNull(),
	rootCommentCount: integer("root_comment_count").notNull(),
	likedCount: integer("liked_count").notNull(),
	wordCount: integer("word_count").notNull(),
	hot: integer().notNull(),
	status: articleStatus().notNull(),
	content: text().notNull(),
	htmlContent: text().notNull(),
	summary: varchar({ length: 500 }).notNull(),
	coverUrl: varchar({ length: 500 }).notNull(),
	contentType: articleContentType("content_type").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "article_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const handBookChapter = pgTable("HandBookChapter", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 200 }).notNull(),
	browseCount: smallint().notNull(),
	commentCount: smallint().notNull(),
	rootComment: smallint().notNull(),
	tryRead: boolean().notNull(),
	content: text().notNull(),
	htmlContent: text().notNull(),
	wordCount: smallint("word_count").notNull(),
	userId: text("user_id").notNull(),
	bookId: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [handBook.id],
			name: "HandBookChapter_bookId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "HandBookChapter_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const handBookChapterComment = pgTable("HandBookChapterComment", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 200 }).notNull(),
	sequence: integer().notNull(),
	handBookChapterId: text("HandBookChapterId").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.handBookChapterId],
			foreignColumns: [handBookChapter.id],
			name: "HandBookChapterComment_HandBookChapterId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const analyze = pgTable("analyze", {
	id: text().primaryKey().notNull(),
	ip: text().notNull(),
	ua: text().notNull(),
	path: text().notNull(),
	timestamp: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const appleGuide = pgTable("AppleGuide", {
	id: serial().primaryKey().notNull(),
	data: text().notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const stickers = pgTable("stickers", {
	id: text().primaryKey().notNull(),
	object: text().notNull(),
	color: text(),
	accessory: text(),
	doing: text(),
	style: text(),
	url: text().notNull(),
	deviceId: text(),
	userId: text(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	live: boolean().default(true).notNull(),
});

export const faviconGen = pgTable("favicon_gen", {
	id: text().primaryKey().notNull(),
	title: text(),
	text: text().notNull(),
	size: integer().notNull(),
	radius: integer().notNull(),
	backgroundColor: text("background_color").notNull(),
	fontFamily: text("font_family").notNull(),
	fontWeight: integer("font_weight").notNull(),
	fontSize: integer("font_size").notNull(),
	fontRotate: integer("font_rotate").notNull(),
	textColor: text("text_color").notNull(),
	textOpacity: integer("text_opacity").default(1).notNull(),
	textStrokeColor: text("text_stroke_color").notNull(),
	textStrockOpacity: integer("text_strock_opacity").default(1).notNull(),
	textStrokeWidth: integer("text_stroke_width").notNull(),
	fineTuneVerticalPostion: integer("fine_tune_vertical_postion").notNull(),
	fineTuneHorizontalPosition: integer("fine_tune_horizontal_position").notNull(),
	fontHeight: integer("font_height").notNull(),
	fontLead: integer("font_lead").notNull(),
	deviceId: text(),
	userId: text(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	live: boolean().default(true).notNull(),
	fork: boolean().default(false).notNull(),
});

export const cat = pgTable("Cat", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 500 }).notNull(),
	description: text().notNull(),
	filename: text().notNull(),
	views: integer().notNull(),
	isPublished: boolean().notNull(),
});

export const autohotbox = pgTable("Autohotbox", {
	id: text().primaryKey().notNull(),
	code: varchar({ length: 500 }).notNull(),
	btcode: text().notNull(),
	name: text().notNull(),
	desc: text().notNull(),
	specification: text().notNull(),
	size: integer().notNull(),
	volume: doublePrecision().notNull(),
	weight: doublePrecision().notNull(),
	boxWeight: doublePrecision().notNull(),
});

export const boxStructure = pgTable("BoxStructure", {
	id: text().primaryKey().notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
});

export const boxUses = pgTable("BoxUses", {
	id: text().primaryKey().notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
});

export const handBook = pgTable("HandBook", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 200 }).notNull(),
	introduce: text().notNull(),
	summary: text().notNull(),
	authorIntro: varchar("author_intro", { length: 200 }).notNull(),
	price: numeric({ precision: 10, scale:  4 }).default('0.0000').notNull(),
	completionAt: timestamp("completion_at", { precision: 3, mode: 'string' }).notNull(),
	isAllDone: boolean("is_all_done").notNull(),
	isAgree: boolean("is_agree").notNull(),
	overUrl: varchar("over_url", { length: 500 }).notNull(),
	wordCount: integer("word_count").notNull(),
	saleCount: integer("sale_count").notNull(),
	commentCount: integer("comment_count").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "HandBook_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const box = pgTable("Box", {
	id: text().primaryKey().notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
	boxType: boxType().notNull(),
	paperType: paperType().notNull(),
	lidType: integer().notNull(),
	bottomType: integer().notNull(),
	detailType: detailType().notNull(),
	title: text().notNull(),
	imgList: text().array(),
	salesCount: integer().default(0).notNull(),
});

export const commoditiesPrice = pgTable("CommoditiesPrice", {
	id: text().primaryKey().notNull(),
	type: text().notNull(),
	time: timestamp({ precision: 3, mode: 'string' }).notNull(),
	price: doublePrecision().notNull(),
	change: doublePrecision().notNull(),
	createAt: text("create_at").notNull(),
	updateAt: text("update_at").notNull(),
});

export const commodities = pgTable("Commodities", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	enName: text().notNull(),
	category: commoditiesCategoryEnum().default('ETF').notNull(),
	createAt: text("create_at").notNull(),
	updateAt: text("update_at").notNull(),
});

export const userRole = pgTable("UserRole", {
	id: text().primaryKey().notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	remark: text().default(''),
	version: integer().default(1).notNull(),
	userId: text("user_id").notNull(),
	roleId: text("role_id").notNull(),
});

export const software = pgTable("Software", {
	id: text().primaryKey().notNull(),
	avatarUrl: text("avatar_url").notNull(),
	description: text().notNull(),
	name: text().notNull(),
	downloadUrl: text("download_url").notNull(),
	sourceUrl: text("source_url").notNull(),
	url: text().notNull(),
	category: text().notNull(),
	platform: text().notNull(),
	recommend: boolean().notNull(),
	createAt: text("create_at").notNull(),
	updateAt: text("update_at").notNull(),
});

export const avatar = pgTable("Avatar", {
	id: text().primaryKey().notNull(),
	filename: text().notNull(),
	mimetype: text().notNull(),
});

export const roles = pgTable("roles", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	key: text().notNull(),
	value: text().notNull(),
	remark: text().default('').notNull(),
	sort: integer().default(0).notNull(),
	scope: integer().default(1).notNull(),
	menuCheckStrictly: boolean("menu_check_strictly").default(true).notNull(),
	deptCheckStrictly: boolean("dept_check_strictly").default(true).notNull(),
	status: integer().default(1),
	delFlag: integer("del_flag").default(0).notNull(),
	isDefault: integer("is_default").default(0),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	permissionId: text(),
	createdBy: text("created_by").default('').notNull(),
	updatedBy: text("updated_by").default('').notNull(),
	version: integer().default(1).notNull(),
}, (table) => [
	index("roles_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("roles_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("roles_value_key").using("btree", table.value.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [permission.id],
			name: "roles_permissionId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const roleToUser = pgTable("_RoleToUser", {
	a: text("A").notNull(),
	b: text("B").notNull(),
}, (table) => [
	index().using("btree", table.b.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.a],
			foreignColumns: [roles.id],
			name: "_RoleToUser_A_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.b],
			foreignColumns: [users.id],
			name: "_RoleToUser_B_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.a, table.b], name: "_RoleToUser_AB_pkey"}),
]);

export const deptToRole = pgTable("_DeptToRole", {
	a: text("A").notNull(),
	b: text("B").notNull(),
}, (table) => [
	index().using("btree", table.b.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.a],
			foreignColumns: [depts.id],
			name: "_DeptToRole_A_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.b],
			foreignColumns: [roles.id],
			name: "_DeptToRole_B_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.a, table.b], name: "_DeptToRole_AB_pkey"}),
]);

export const menuToRole = pgTable("_MenuToRole", {
	a: text("A").notNull(),
	b: text("B").notNull(),
}, (table) => [
	index().using("btree", table.b.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.a],
			foreignColumns: [menu.id],
			name: "_MenuToRole_A_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.b],
			foreignColumns: [roles.id],
			name: "_MenuToRole_B_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.a, table.b], name: "_MenuToRole_AB_pkey"}),
]);

export const poemToPoemTag = pgTable("_PoemToPoemTag", {
	a: integer("A").notNull(),
	b: integer("B").notNull(),
}, (table) => [
	index().using("btree", table.b.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.a],
			foreignColumns: [poem.id],
			name: "_PoemToPoemTag_A_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.b],
			foreignColumns: [poemTag.id],
			name: "_PoemToPoemTag_B_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.a, table.b], name: "_PoemToPoemTag_AB_pkey"}),
]);

export const authenticator = pgTable("Authenticator", {
	credentialId: text("credential_id").notNull(),
	userId: text("user_id").notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	credentialPublicKey: text("credential_public_key").notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text("credential_device_type").notNull(),
	credentialBackedUp: boolean("credential_backed_up").notNull(),
	transports: text(),
}, (table) => [
	uniqueIndex("Authenticator_credential_id_key").using("btree", table.credentialId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "Authenticator_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.credentialId, table.userId], name: "Authenticator_pkey"}),
]);
