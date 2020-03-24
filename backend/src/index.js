const express = require('express');
const routes = require('./routes');
const cors  = require('cors')

const app = express();

app.use(cors());
app.use( express.json());
app.use(routes)

app.listen(3333, () => {
    console.log('Rodando na porta: 3333');
    console.log('Acessar http://localhost:3333');
});

