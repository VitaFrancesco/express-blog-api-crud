const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Pagina iniziale');
});

const postsRouter = require('./router/posts');

app.use(express.static('public'));

app.use(express.json());

app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log('Server in ascolto sulla porta ' + port);
});