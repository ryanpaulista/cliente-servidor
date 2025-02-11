const dgram = require("dgram");
const os = require("os");

const BROADCAST_ADDR = "255.255.255.255";
const PORT = 41234;
const INTERVAL = 10000; // Enviar a cada 5 segundos

const client = dgram.createSocket("udp4");
client.bind(() => {
    client.setBroadcast(true);
});

function getSystemInfo() {
    return JSON.stringify({
        hostname: os.hostname(),
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        cpuCores: os.cpus().length,
        loadAvg: os.loadavg(),
        diskFree: "N/A", // Para pegar info de disco, seria necessário uma lib como 'diskusage'
    });
}

setInterval(() => {
    const message = Buffer.from(getSystemInfo());
    client.send(message, 0, message.length, PORT, BROADCAST_ADDR, (err) => {
        if (err) console.error("Erro ao enviar:", err);
    });
}, INTERVAL);

