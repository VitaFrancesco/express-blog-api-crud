const express = require('express');
const router = express.Router();
const postsArray = require('../posts');

const postsController = require('../controllers/controllerPosts');

router.param('id', (req, res, next, id) => {
    const postId = parseInt(req.params.id);
    let post = postsArray.find((el) => el.id === postId);

    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            messagge: "Post non trovato (middleware)"
        })
    };
    
    req.post = post;
    next();
});

// index
router.get('/', postsController.index);

// show
router.get('/:key', postsController.show);

// store
router.post('/', postsController.store);

// update
router.put('/:id', postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:key', postsController.destroy);

module.exports = router;