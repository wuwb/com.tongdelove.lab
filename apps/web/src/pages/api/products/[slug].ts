import type { NextApiRequest, NextApiResponse } from 'next'
import { db, products, eq, and } from '@tongdelove/db/sqlite'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query

    if (!slug || typeof slug !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Invalid product slug',
      })
      return
    }

    if (req.method === 'GET') {
      const product = await db
        .select()
        .from(products)
        .where(and(eq(products.slug, slug), eq(products.isDeleted, false)))
        .limit(1)

      if (product.length === 0) {
        res.status(404).json({
          success: false,
          error: 'Product not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        data: product[0],
      })
    } else if (req.method === 'PUT') {
      const body = req.body
      const updated = await db
        .update(products)
        .set({
          name: body.name,
          title: body.title,
          subTitle: body.subTitle,
          price: body.price,
          image: body.image,
          categoryId: body.categoryId,
          isOnSale: body.isOnSale,
          sort: body.sort,
          updatedAt: Math.floor(Date.now() / 1000),
        })
        .where(eq(products.slug, slug))
        .returning()

      if (updated.length === 0) {
        res.status(404).json({
          success: false,
          error: 'Product not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        data: updated[0],
      })
    } else if (req.method === 'DELETE') {
      const deleted = await db
        .update(products)
        .set({
          isDeleted: true,
          updatedAt: Math.floor(Date.now() / 1000),
        })
        .where(eq(products.slug, slug))
        .returning()

      if (deleted.length === 0) {
        res.status(404).json({
          success: false,
          error: 'Product not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      })
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
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
