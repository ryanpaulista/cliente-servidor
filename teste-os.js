const os = require("os");

function getSystemInfo() {
    return {
        system: {
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            osType: os.type(),
            osVersion: os.version(),
            homeDir: os.homedir(),
            tempDir: os.tmpdir(),
            uptimeSeconds: os.uptime(), // Tempo de atividade em segundos
        },
        memory: {
            totalMemoryGB: (os.totalmem() / (1024 ** 3)).toFixed(2), // Convertido para GB
            freeMemoryGB: (os.freemem() / (1024 ** 3)).toFixed(2), // Convertido para GB
        },
        cpu: {
            cores: os.cpus().length,
            model: os.cpus()[0].model,
            speedMHz: os.cpus()[0].speed, // Velocidade da CPU
            loadAverage: os.loadavg(), // Carga média do sistema (somente em Linux/macOS)
        },
        network: os.networkInterfaces(), // Interfaces de rede detalhadas
        userInfo: os.userInfo(), // Informações do usuário logado
        constants: os.constants, // Constantes do sistema operacional
    };
}

// Executa a função e exibe o JSON formatado
console.log(JSON.stringify(getSystemInfo(), null, 4));
