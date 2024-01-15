import axios from '@/utils/axios'

const SERVER_URL = 'http://127.0.0.1:3001'

export async function getProduct(id) {
  const { data } = await axios(`${SERVER_URL}/topics/${id}`)
  return stripProduct(data.product)
}

export async function gettopics() {
  const { data } = await axios(`${SERVER_URL}/topics`)
  return data.topics.map(stripProduct)
}

function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2),
    pictureUrl: SERVER_URL + product.picture.url,
  }
}
