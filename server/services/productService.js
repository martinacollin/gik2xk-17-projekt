const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');



async function getAll() {
    try {
        const allProducts = await db.product.findAll({ include: [db.rating] });
        /* Om allt blev bra, returnera allProducts */
        return createResponseSuccess(allProducts.map((product) => _formatProduct(product.dataValues)));
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
        updatedAt: product.updatedAt
    };

    if (product.ratings) {
        cleanProduct.ratings = [];
        product.ratings.map((rating) => {
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
    destroy
};