const postsArray = require('../posts');

function index (req, res) {
    const queryTag = req.query.tag;

    
    let postsFiltered = postsArray;
    if(req.query.tag) {
        postsFiltered = postsArray.filter((el) => el.tags.includes(queryTag));
        
        if (!postsFiltered) {
            res.status(404);
            return res.json({
                error: "Not Found",
                message: "Il post non è stato trovato"
            });
        };
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
    const lastIndex = postsArray.at(-1).id;

    newPost = {
        id: lastIndex + 1,
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    postsArray.push(newPost);
    res.status(201);

    res.json(newPost);
    console.log(postsArray);
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
        let indexEls =[];
        postsArray.forEach((el) => {
            if (el.tags.includes(key)) {
                indexEls.push(el.id);
            };
        });
        indexEls.forEach((index) => {
            postId = postsArray.findIndex((el) => el.id === index);
            postsArray.splice(postId, 1);
        })
    };
    

    if (!postId && postId !== 0) {
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