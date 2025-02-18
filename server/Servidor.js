const dgram = require("dgram");
const fs = require("fs");

const PORT = 41234;
const server = dgram.createSocket("udp4");
const FILE_PATH = "clientes.json";
const TIMEOUT = 30000;

let clients = {};

function saveClients(){
    fs.writeFileSync(FILE_PATH, JSON.stringify(clients, null, 4));
}

function loadClients(){
    if(fs.existsSync(FILE_PATH)){
        try{
            clients = JSON.parse((fs.readFileSync(FILE_PATH, "utf8")));
        } catch(error){
            console.error("Erro ao carregar arquivo JSON: ", error);
        }
    }
}

loadClients();

server.on("message", (msg, rinfo) => {
    const clientID = rinfo.address;  
    const data = JSON.parse(msg.toString());
    
    clients[clientID] = {
        ...data,
        lastUpdate: Date.now(),
    }

    console.log(`Informações recebidas de ${clientID}`);

    // Salvar em um arquivo JSON
    saveClients();
});

server.on("listening", () => {
    const address = server.address();
    console.log(`Servidor escutando em ${address.address}:${address.port}`);
});

// Agora escuta todas as interfaces, incluindo broadcast
server.bind(PORT, "0.0.0.0", () => {
    server.setBroadcast(true); // Permite receber mensagens de broadcast
});

setInterval(() => {

    const now = Date.now();
    let updated = false;

    for (const client in clients){
        if(now - clients[client].lastUpdate > TIMEOUT){
            console.log(`Removendo cliente inativo: ${client}`);
            delete clients[client];
            updated = true;
        }
    }

    if (updated){
        saveClients();
    }

}, TIMEOUT/2)
