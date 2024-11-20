const postsArray = require('../posts');

function index (req, res) {
    const queryTag = req.query.tag;

    if (!queryTag) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Il post non è stato trovato"
        });
    };

    let postsFiltered = postsArray;
    if(req.query.tag) {
        postsFiltered = postsArray.filter((el) => el.tags.includes(queryTag));
    };
    
    res.json(postsFiltered);


};

function show (req, res) {
    const key = req.params.key;
    let post;

    if (isNaN(parseInt(key))) {
        post = postsArray.filter((el) => el.tags.includes(key));
    } else {
        post = postsArray.filter((el) => el.id === parseInt(key));
    };
    if ( post.length > 0) {
        res.json(post);
    } else {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Il post non è stato trovato"
        });
    };

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
    const key = req.params.key;
    let postId;
    if (!(isNaN(parseInt(key)))) {
        postId = postsArray.findIndex((el) => el.id === parseInt(key));
        postsArray.splice(postId, 1);
    } else {
        const postTag = postsArray.filter((el) => el.tags.includes(key));
        postId = postTag.map((el) => postsArray.findIndex(el));
        postId.forEach((el) => postsArray.splice(el, 1));
    };
    

    if (!postId) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Il post non è stato trovato"
        });
    };

    
    console.log(postsArray);

    res.status(204);
    res.send();
};

module.exports = {index, show, store, update, modify, destroy};