const net = require('net');
const si = require('systeminformation');

const client = new net.Socket();

client.connect(3000, '127.0.0.1', async () => {
    console.log('Conectado ao servidor');

    const cpuTemp = await si.cpuTemperature();
    client.write(`Temperatura da CPU: ${cpuTemp.main}°C`);

    client.end();
});