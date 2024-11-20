const postsArray = require('../posts');

function index (req, res) {
    res.json(postsArray);
};

function show (req, res) {
    const slug = req.params.slug;

    const post = postsArray.filter((el) => el.slug === slug);
    if ( post.length > 0) {
        res.json(post);
    } else {
        res.send('Ecco il post ' + req.params.slug);
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
    res.send('Eliminazione del post ' + req.params.id);
};

module.exports = {index, show, store, update, modify, destroy};