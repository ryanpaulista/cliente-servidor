const { error } = require('console');
const net = require('net');
const si = require('systeminformation');

const client = new net.Socket();

client.connect(3000, '127.0.0.1', async () => {
    console.log('Conectado ao servidor');
    try{
        const memInfo = await si.mem();
        const diskInfo = await si.fsSize();
        const disk1 = diskInfo[0];
        client.write(`Mémoria RAM livre: ${memInfo.free}\n`);
        client.write(`Espaço em disco livre: ${disk1.available}`);
    } catch {
        console.error('Erro ao obter informações de memória: ', error);
    } finally{
        client.end();
    }
    
    client.end();
});