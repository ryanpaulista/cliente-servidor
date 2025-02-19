const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Habilita CORS para todas as rotas
// O cors "diz" ao navegador que é permitido que a página index.html acessar os dados do servidor.

app.use(cors());

app.get('/api/info', (req, res) => {
    const filePath = path.join(__dirname, '../server/clientes.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.log('Erro ao ler o arquivo JSON: ', err);
            return res.status(500).json({ error: 'Erro ao carregar os dados' });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
