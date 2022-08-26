import fetchJsonp from 'fetch-jsonp';
import { fetchJson } from './api';

const SERVER_URL = 'http://127.0.0.1:3001'

export async function getProduct(id) {
    const product = await fetchJson(`${SERVER_URL}/topics/${id}`);
    return stripProduct(product);
}

export async function gettopics() {
    const topics = await fetchJson(`${SERVER_URL}/topics`);
    return topics.map(stripProduct);
}

function stripProduct(product) {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: '$' + product.price.toFixed(2),
        pictureUrl: SERVER_URL + product.picture.url,
    };
}
