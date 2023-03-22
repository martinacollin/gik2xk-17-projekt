const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');



async function getAll() {
    try {
        const allProducts = await db.product.findAll();
        /* Om allt blev bra, returnera allProducts */
        return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getById(id) {
    try {
        const product = await db.product.findOne({
            where: { id },
            include: [db.rating]
        });
        /* Om allt blev bra, returnera product */
        return createResponseSuccess(_formatProduct(product));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function create(product) {
    try {
        const newProduct = await db.product.create(product);
        return createResponseSuccess(newProduct);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function update(product, id) {
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
        const existingProduct = await db.product.findOne({ where: { id } });
        if (!existingProduct) {
            return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
        }
        await db.product.update(product, {
            where: { id }
        });
        return createResponseMessage(200, 'Produkten uppdaterades.');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function addRating(productId, rating) {
    if (!productId) {
        return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
        rating.productId = productId;
        await db.rating.create(rating);

        const productWithNewRating = await db.product.findOne({
            where: { id: productId },
            include: [db.rating]
        });

        return createResponseSuccess(_formatProduct(productWithNewRating));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function addToCart(productId, cartId, amount) {
    if (!productId || !cartId) {
        return createResponseError(422, 'productId och cartId är obligatoriskt');
    }
    try {
        const existing = await db.cartRow.findOne({
            where: { cartId, productId }
        });
        if (existing) {
            amount += existing.amount;
        }
        const cartRow = { id: existing?.id, productId: +productId, cartId, amount };
        const [newCartRow, created] = await db.cartRow.upsert(cartRow);
        return createResponseSuccess(newCartRow);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function destroy(id) {
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
        await db.product.destroy({
            where: { id }
        });
        return createResponseMessage(200, 'Produkten raderades.');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

function _formatProduct(product) {
    const cleanProduct = {
        id: product.id,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        ratings: []
    };

    if (product.ratings) {
        product.ratings.map(rating => {
            return (cleanProduct.ratings = [rating.rating, ...cleanProduct.ratings]);
        });
    }

    return cleanProduct;
}

module.exports = {
    getById,
    getAll,
    create,
    update,
    addRating,
    addToCart,
    destroy
};