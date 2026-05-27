import type { NextApiRequest, NextApiResponse } from 'next'
import {
  db,
  products,
  productCategories,
  eq,
  desc,
  asc,
  and,
  like,
} from '@tongdelove/db/sqlite'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { category, search, limit, offset, sort } = req.query

      let query = db
        .select()
        .from(products)
        .where(eq(products.isDeleted, false))

      if (search && typeof search === 'string') {
        query = query.where(
          and(
            eq(products.isDeleted, false),
            like(products.title, `%${search}%`)
          )
        )
      }

      const limitNum = limit ? parseInt(limit as string) : 20
      const offsetNum = offset ? parseInt(offset as string) : 0

      let orderBy = desc(products.sort)
      if (sort === 'price-asc') {
        orderBy = asc(products.price)
      } else if (sort === 'price-desc') {
        orderBy = desc(products.price)
      } else if (sort === 'newest') {
        orderBy = desc(products.createdAt)
      }

      const allProducts = await db
        .select()
        .from(products)
        .where(eq(products.isDeleted, false))
        .orderBy(orderBy)
        .limit(limitNum)
        .offset(offsetNum)

      const total = await db
        .select({ count: products.id })
        .from(products)
        .where(eq(products.isDeleted, false))

      res.status(200).json({
        success: true,
        data: allProducts,
        total: total.length,
        pagination: {
          limit: limitNum,
          offset: offsetNum,
        },
      })
    } else if (req.method === 'POST') {
      const body = req.body
      const newProduct = await db
        .insert(products)
        .values({
          name: body.name,
          slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
          title: body.title || body.name,
          subTitle: body.subTitle || '',
          price: body.price || 0,
          image: body.image || '',
          categoryId: body.categoryId || '',
          isOnSale: body.isOnSale ?? true,
          sort: body.sort || 100,
        })
        .returning()

      res.status(201).json({
        success: true,
        data: newProduct[0],
      })
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}
