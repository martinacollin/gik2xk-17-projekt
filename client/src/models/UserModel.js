import api from '../api.js';

export async function getUser(id) {
    const result = await api.get(`/users/${id}`);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}

export async function getCart(id) {
    const result = await api.get(`/users/${id}/cart`);

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return {};
    }
}