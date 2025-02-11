const dgram = require("dgram");
const fs = require("fs");

const PORT = 41234;
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
    const data = msg.toString();
    console.log(`Recebido de ${rinfo.address}:`, data);
    
    // Salvar em um arquivo JSON
    fs.appendFile("logs.json", rinfo.address + " = " + data + "\n", (err) => {
        if (err) console.error("Erro ao salvar:", err);
    });
});

server.on("listening", () => {
    const address = server.address();
    console.log(`Servidor escutando em ${address.address}:${address.port}`);
});

// Agora escuta todas as interfaces, incluindo broadcast
server.bind(PORT, "0.0.0.0", () => {
    server.setBroadcast(true); // Permite receber mensagens de broadcast
});
