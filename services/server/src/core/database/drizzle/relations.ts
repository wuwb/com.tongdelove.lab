import { relations } from "drizzle-orm/relations";
import { keyword, poemKeywords, poem, dataCleaningQueue, temuRequests, poemAuthor, users, post, depts, sessions, poemCard, category, link, menu, brand, product, payMethod, customer, order, productSku, orderDetail, address, telephone, cart, store, creditTransaction, stripeTransaction, article, comment, tag, accounts, feedback, collection, book, bookChapter, bookStar, handBook, handBookChapter, handBookChapterComment, permission, roles, roleToUser, deptToRole, menuToRole, poemToPoemTag, poemTag, authenticator } from "./schema";

export const poemKeywordsRelations = relations(poemKeywords, ({one}) => ({
	keyword: one(keyword, {
		fields: [poemKeywords.keywordId],
		references: [keyword.id]
	}),
	poem: one(poem, {
		fields: [poemKeywords.poemId],
		references: [poem.id]
	}),
}));

export const keywordRelations = relations(keyword, ({many}) => ({
	poemKeywords: many(poemKeywords),
}));

export const poemRelations = relations(poem, ({one, many}) => ({
	poemKeywords: many(poemKeywords),
	poemAuthor: one(poemAuthor, {
		fields: [poem.authorId],
		references: [poemAuthor.id]
	}),
	poemCards: many(poemCard),
	poemToPoemTags: many(poemToPoemTag),
}));

export const temuRequestsRelations = relations(temuRequests, ({one}) => ({
	dataCleaningQueue: one(dataCleaningQueue, {
		fields: [temuRequests.cleaningJobId],
		references: [dataCleaningQueue.id]
	}),
}));

export const dataCleaningQueueRelations = relations(dataCleaningQueue, ({many}) => ({
	temuRequests: many(temuRequests),
}));

export const poemAuthorRelations = relations(poemAuthor, ({many}) => ({
	poems: many(poem),
}));

export const postRelations = relations(post, ({one, many}) => ({
	user: one(users, {
		fields: [post.userId],
		references: [users.id]
	}),
	products: many(product),
	comments: many(comment),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	posts: many(post),
	dept: one(depts, {
		fields: [users.deptId],
		references: [depts.id]
	}),
	sessions: many(sessions),
	links: many(link),
	payMethods: many(payMethod),
	orders: many(order),
	carts: many(cart),
	comments: many(comment),
	creditTransactions: many(creditTransaction),
	accounts: many(accounts),
	telephones: many(telephone),
	books: many(book),
	bookChapters: many(bookChapter),
	bookStars: many(bookStar),
	articles: many(article),
	handBookChapters: many(handBookChapter),
	handBooks: many(handBook),
	roleToUsers: many(roleToUser),
	authenticators: many(authenticator),
}));

export const deptsRelations = relations(depts, ({one, many}) => ({
	users: many(users),
	dept: one(depts, {
		fields: [depts.deptId],
		references: [depts.id],
		relationName: "depts_deptId_depts_id"
	}),
	depts: many(depts, {
		relationName: "depts_deptId_depts_id"
	}),
	deptToRoles: many(deptToRole),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const poemCardRelations = relations(poemCard, ({one}) => ({
	poem: one(poem, {
		fields: [poemCard.poemId],
		references: [poem.id]
	}),
}));

export const linkRelations = relations(link, ({one}) => ({
	category: one(category, {
		fields: [link.categoryId],
		references: [category.id]
	}),
	user: one(users, {
		fields: [link.userId],
		references: [users.id]
	}),
}));

export const categoryRelations = relations(category, ({one, many}) => ({
	links: many(link),
	article: one(article, {
		fields: [category.articleId],
		references: [article.id]
	}),
	category: one(category, {
		fields: [category.parentId],
		references: [category.id],
		relationName: "category_parentId_category_id"
	}),
	categories: many(category, {
		relationName: "category_parentId_category_id"
	}),
}));

export const menuRelations = relations(menu, ({one, many}) => ({
	menu: one(menu, {
		fields: [menu.parentId],
		references: [menu.id],
		relationName: "menu_parentId_menu_id"
	}),
	menus: many(menu, {
		relationName: "menu_parentId_menu_id"
	}),
	menuToRoles: many(menuToRole),
}));

export const productRelations = relations(product, ({one, many}) => ({
	brand: one(brand, {
		fields: [product.brandId],
		references: [brand.id]
	}),
	post: one(post, {
		fields: [product.postId],
		references: [post.id]
	}),
	productSkus: many(productSku),
}));

export const brandRelations = relations(brand, ({many}) => ({
	products: many(product),
}));

export const payMethodRelations = relations(payMethod, ({one}) => ({
	user: one(users, {
		fields: [payMethod.userId],
		references: [users.id]
	}),
}));

export const orderRelations = relations(order, ({one, many}) => ({
	customer: one(customer, {
		fields: [order.customerId],
		references: [customer.id]
	}),
	user: one(users, {
		fields: [order.userId],
		references: [users.id]
	}),
	orderDetails: many(orderDetail),
}));

export const customerRelations = relations(customer, ({many}) => ({
	orders: many(order),
	addresses: many(address),
}));

export const productSkuRelations = relations(productSku, ({one, many}) => ({
	product: one(product, {
		fields: [productSku.productId],
		references: [product.id]
	}),
	orderDetails: many(orderDetail),
}));

export const orderDetailRelations = relations(orderDetail, ({one}) => ({
	order: one(order, {
		fields: [orderDetail.orderId],
		references: [order.id]
	}),
	productSku: one(productSku, {
		fields: [orderDetail.productSkuId],
		references: [productSku.id]
	}),
}));

export const addressRelations = relations(address, ({one}) => ({
	customer: one(customer, {
		fields: [address.customerId],
		references: [customer.id]
	}),
	telephone: one(telephone, {
		fields: [address.telephoneId],
		references: [telephone.id]
	}),
}));

export const telephoneRelations = relations(telephone, ({one, many}) => ({
	addresses: many(address),
	stores: many(store),
	user: one(users, {
		fields: [telephone.userId],
		references: [users.id]
	}),
	feedbacks: many(feedback),
}));

export const cartRelations = relations(cart, ({one}) => ({
	user: one(users, {
		fields: [cart.userId],
		references: [users.id]
	}),
}));

export const storeRelations = relations(store, ({one}) => ({
	telephone: one(telephone, {
		fields: [store.phoneId],
		references: [telephone.id]
	}),
}));

export const stripeTransactionRelations = relations(stripeTransaction, ({one}) => ({
	creditTransaction: one(creditTransaction, {
		fields: [stripeTransaction.transactionId],
		references: [creditTransaction.id]
	}),
}));

export const creditTransactionRelations = relations(creditTransaction, ({one, many}) => ({
	stripeTransactions: many(stripeTransaction),
	user: one(users, {
		fields: [creditTransaction.userId],
		references: [users.id]
	}),
}));

export const commentRelations = relations(comment, ({one}) => ({
	article: one(article, {
		fields: [comment.articleId],
		references: [article.id]
	}),
	post: one(post, {
		fields: [comment.postId],
		references: [post.id]
	}),
	user: one(users, {
		fields: [comment.userId],
		references: [users.id]
	}),
}));

export const articleRelations = relations(article, ({one, many}) => ({
	comments: many(comment),
	tags: many(tag),
	categories: many(category),
	collections: many(collection),
	user: one(users, {
		fields: [article.userId],
		references: [users.id]
	}),
}));

export const tagRelations = relations(tag, ({one}) => ({
	article: one(article, {
		fields: [tag.articleId],
		references: [article.id]
	}),
}));

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const feedbackRelations = relations(feedback, ({one}) => ({
	telephone: one(telephone, {
		fields: [feedback.telephoneId],
		references: [telephone.id]
	}),
}));

export const collectionRelations = relations(collection, ({one}) => ({
	article: one(article, {
		fields: [collection.articleId],
		references: [article.id]
	}),
}));

export const bookRelations = relations(book, ({one, many}) => ({
	user: one(users, {
		fields: [book.userId],
		references: [users.id]
	}),
	bookChapters: many(bookChapter),
}));

export const bookChapterRelations = relations(bookChapter, ({one}) => ({
	book: one(book, {
		fields: [bookChapter.bookId],
		references: [book.id]
	}),
	user: one(users, {
		fields: [bookChapter.userId],
		references: [users.id]
	}),
}));

export const bookStarRelations = relations(bookStar, ({one}) => ({
	user: one(users, {
		fields: [bookStar.userId],
		references: [users.id]
	}),
}));

export const handBookChapterRelations = relations(handBookChapter, ({one, many}) => ({
	handBook: one(handBook, {
		fields: [handBookChapter.bookId],
		references: [handBook.id]
	}),
	user: one(users, {
		fields: [handBookChapter.userId],
		references: [users.id]
	}),
	handBookChapterComments: many(handBookChapterComment),
}));

export const handBookRelations = relations(handBook, ({one, many}) => ({
	handBookChapters: many(handBookChapter),
	user: one(users, {
		fields: [handBook.userId],
		references: [users.id]
	}),
}));

export const handBookChapterCommentRelations = relations(handBookChapterComment, ({one}) => ({
	handBookChapter: one(handBookChapter, {
		fields: [handBookChapterComment.handBookChapterId],
		references: [handBookChapter.id]
	}),
}));

export const rolesRelations = relations(roles, ({one, many}) => ({
	permission: one(permission, {
		fields: [roles.permissionId],
		references: [permission.id]
	}),
	roleToUsers: many(roleToUser),
	deptToRoles: many(deptToRole),
	menuToRoles: many(menuToRole),
}));

export const permissionRelations = relations(permission, ({many}) => ({
	roles: many(roles),
}));

export const roleToUserRelations = relations(roleToUser, ({one}) => ({
	role: one(roles, {
		fields: [roleToUser.a],
		references: [roles.id]
	}),
	user: one(users, {
		fields: [roleToUser.b],
		references: [users.id]
	}),
}));

export const deptToRoleRelations = relations(deptToRole, ({one}) => ({
	dept: one(depts, {
		fields: [deptToRole.a],
		references: [depts.id]
	}),
	role: one(roles, {
		fields: [deptToRole.b],
		references: [roles.id]
	}),
}));

export const menuToRoleRelations = relations(menuToRole, ({one}) => ({
	menu: one(menu, {
		fields: [menuToRole.a],
		references: [menu.id]
	}),
	role: one(roles, {
		fields: [menuToRole.b],
		references: [roles.id]
	}),
}));

export const poemToPoemTagRelations = relations(poemToPoemTag, ({one}) => ({
	poem: one(poem, {
		fields: [poemToPoemTag.a],
		references: [poem.id]
	}),
	poemTag: one(poemTag, {
		fields: [poemToPoemTag.b],
		references: [poemTag.id]
	}),
}));

export const poemTagRelations = relations(poemTag, ({many}) => ({
	poemToPoemTags: many(poemToPoemTag),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(users, {
		fields: [authenticator.userId],
		references: [users.id]
	}),
}));