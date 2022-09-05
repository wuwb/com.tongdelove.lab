import axios from '@/utils/axios'

const { CMS_URL } = process.env;

export async function getProduct(id) {
    const { data } = await axios(`${CMS_URL}/products/${id}`);
    return stripProduct(data.product);
}

export async function getProducts() {
    const { data } = await axios(`${CMS_URL}/products`);
    return data.products.map(stripProduct);
}

function stripProduct(product) {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: '$' + product.price.toFixed(2),
        pictureUrl: CMS_URL + product.picture.url,
    };
}
