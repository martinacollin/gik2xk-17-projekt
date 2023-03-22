const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');

async function getById(id) {
    try {
        const [user, created] = await db.user.findOrCreate({
            where: { id },
            defaults: {
                email: 'johndoe@defaultuser.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password'
            }
        });
        return createResponseSuccess(_formatUser(user));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getCart(userId) {
    try {
        const [activeCart, created] = await db.cart.findOrCreate({
            where: { userId, payed: false },
            include: [db.product]
        });
        return createResponseSuccess(_formatActiveCart(activeCart));
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

function _formatActiveCart(cart) {
    if (!cart) {
        return null;
    }
    const cleanCart = {
        id: cart.id,
        payed: cart.payed,
        products: []
    };
    if (cart.products) {
        cart.products.map(product => {
            console.log(product.cartRow);
            const cleanProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                amount: product.cartRow.amount
            };
            return (cleanCart.products = [cleanProduct, ...cleanCart.products]);
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