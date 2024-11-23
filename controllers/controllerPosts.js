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

    const {title, slug, content, image, tags} = req.body;
    const newPost = {
        id: lastIndex + 1,
        title,
        slug,
        content,
        image,
        tags
    }

    postsArray.push(newPost);
    res.status(201);

    res.json(newPost);
    console.log(postsArray);
};

function update (req, res) {
    let post = req.post;

    const {title, slug, content, image, tags} = req.body;
    post.title = title,
    post.slug = slug,
    post.content = content,
    post.image = image,
    post.tags = tags

    console.log(postsArray);
    res.json(post);
};

function modify (req, res) {
    let post = req.post;

    const {title, slug, content, image, tags} = req.body;

    if (title) post.title = title;
    if (slug) post.slug = slug;
    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags;

    res.json(post);
    console.log(postsArray);
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