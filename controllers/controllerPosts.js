const postsArray = require('../posts');

function index (req, res) {
    res.json(postsArray);
};

function show (req, res) {
    const id = parseInt(req.params.id);

    const post = postsArray.filter((el) => el.id === id);
    if ( post.length > 0) {
        res.json(post);
    } else {
        res.send('Ecco il post ' + id);
    }
};

function store (req, res) {
    res.send('Creazione nuovo post');
};

function update (req, res) {
    res.send('Modifica integrale del post ' + req.params.id);
};

function modify (req, res) {
    res.send('Modifica parziale del post' + req.params.id);
};

function destroy (req, res) {
    const id = parseInt(req.params.id);
    const postId = postsArray.findIndex((el) => el.id === id);
    postsArray.splice(postId, 1);
    
    console.log(postsArray);

    res.status(204);
    res.send();
};

module.exports = {index, show, store, update, modify, destroy};