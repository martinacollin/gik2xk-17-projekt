const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');

async function getById(id) {
    try {
        const user = await db.user.findOne({
            where: { id }
        });
        /* Om allt blev bra, returnera user */
        return createResponseSuccess(_formatUser(user));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getCart(userId) {
    try {
        const activeCart = await db.cart.findOne({
            where: { userId, payed: false }
        });
        const cartRows = await db.cartRow.findAll({
            where: { cartId: activeCart.id }
        });
        activeCart.cartRows = cartRows;
        return createResponseSuccess(_formatActiveCart([activeCart]));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function create(user) {
    try {
        const newUser = await db.user.create(user);
        const newCart = await db.cart.create({
            payed: false,
            userId: newUser.id
        });
        newUser.carts = [newCart];
        return createResponseSuccess(_formatUser(newUser));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function destroy(id) {
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
        await db.user.destroy({
            where: { id }
        });
        return createResponseMessage(200, 'Användare raderades.');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

function _formatUser(user) {
    const cleanUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        cart: null
    };
    return cleanUser;
}

function _formatActiveCart(carts) {
    if (!carts || !carts.length) {
        return null;
    }
    const activeCart = carts[carts.length - 1]; // ta den senaste ifall det skulle finnas fler
    const cleanCart = {
        id: activeCart.id,
        payed: activeCart.payed,
        cartRows: []
    };
    if (activeCart.cartRows) {
        activeCart.cartRows.map(cartRow => {
            const cleanCartRow = {
                id: cartRow.id,
                productId: cartRow.productId,
                amount: cartRow.amount
            };
            return (cleanCart.cartRows = [cleanCartRow, ...cleanCart.cartRows]);
        });
    }
    return cleanCart;
}

module.exports = {
    getById,
    getCart,
    create,
    destroy
};