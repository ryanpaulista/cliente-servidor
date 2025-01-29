const net = require('net');

const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    socket.on('data', (data) => {
        console.log('Dados recebidos:', data.toString());
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Servidor ouvindo na porta 3000');
});