import api from '../api.js';

export async function getAll(url = '/products') {
    const result = await api.get(url);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return [];
    }
}

export async function getOne(id) {
    const result = await api.get(`/products/${id}`);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export async function update(product) {
    const result = await api.put('/products/', product);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export async function create(product) {
    const result = await api.post('/products/', product);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export async function addRating(productId, rating) {
    const result = await api.post(`/products/${productId}/addRating`, rating);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export async function addToCart(productId, cartId, amount) {
    const result = await api.post(`/products/${productId}/addToCart`, { cartId, amount });

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export async function remove(id) {
    const result = await api.delete('/products/', { data: { id } });

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export function calculateRating(ratings) {
    if (!ratings || !ratings.length) {
        return null;
    }
    let sum = 0;
    ratings.forEach(rating => sum += rating);
    const average = sum / ratings.length;
    console.log(average);
    return average;
}

