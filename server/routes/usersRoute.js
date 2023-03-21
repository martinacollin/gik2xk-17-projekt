const router = require('express').Router();
const userService = require('../services/userService');

router.get('/:id/cart', (req, res) => {
    const id = req.params.id;

    userService.getCart(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    userService.getById(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.post('/', (req, res) => {
    const user = req.body;
    userService.create(user).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.delete('/', (req, res) => {
    const id = req.body.id;

    userService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

module.exports = router;
