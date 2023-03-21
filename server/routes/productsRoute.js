const router = require('express').Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    productService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    productService.getById(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.post('/', (req, res) => {
    const product = req.body;
    productService.create(product).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.put('/', (req, res) => {
    const product = req.body;
    const id = product.id;

    productService.update(product, id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.delete('/', (req, res) => {
    const id = req.body.id;

    productService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.post('/:id/addRating', (req, res) => {
    const rating = req.body;
    const productId = req.params.id;

    productService.addRating(productId, rating).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.post('/:id/addToCart', (req, res) => {
    const cartId = req.body.cartId;
    const amount = req.body.amount;
    const productId = req.params.id;

    productService.addToCart(productId, cartId, amount).then((result) => {
        res.status(result.status).json(result.data);
    });
});


module.exports = router;
