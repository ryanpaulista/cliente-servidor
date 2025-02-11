const dgram = require("dgram");
const os = require("os");
const si = require("systeminformation");

const BROADCAST_ADDR = "10.25.255.255"; // Troque pelo IP correto, ex: "172.25.111.255"
const PORT = 41234;
const INTERVAL = 10000; // Enviar a cada 10 segundos

const client = dgram.createSocket("udp4");
client.bind(() => {
    client.setBroadcast(true);
});

async function getSystemInfo() {
    try {
        const diskInfo = await si.fsSize(); // Aguarda os dados do disco
        const diskFreeGB = (diskInfo[0].available / (1024 ** 3)).toFixed(2);
        return JSON.stringify({
            hostname: os.userInfo().username,
            freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2),
            cpuCores: os.cpus().length,
            diskFree: diskFreeGB, // Pega espaço disponível no primeiro disco (diskInfo[0].available / (1024 ** 3)).toFixed(2)
        });
    } catch (error) {
        console.error("Erro ao obter informações do sistema:", error);
        return JSON.stringify({ error: "Falha ao coletar dados do sistema" });
    }
}

async function sendSystemInfo() {
    const message = Buffer.from(await getSystemInfo());
    client.send(message, 0, message.length, PORT, BROADCAST_ADDR, (err) => {
        if (err) console.error("Erro ao enviar:", err);
    });
}

setInterval(sendSystemInfo, INTERVAL);
