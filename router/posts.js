const express = require('express');
const router = express.Router();

const postsController = require('../controllers/controllerPosts');

// index
router.get('/', postsController.index);

// show
router.get('/:slug', postsController.show);

// store
router.post('/', postsController.store);

// update
router.put('/:id', postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:id', postsController.destroy);

module.exports = router;