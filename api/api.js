const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/api/info', (req, res) => {
    const filePath = path.join(__dirname, '../server/clientes.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.log('Erro ao ler aqrquivo JSON: ', err);
            return res.status(500).json({error: 'Erro ao carregar os dados'});
        }

        res.json(JSON.parse(data));
    })

});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});