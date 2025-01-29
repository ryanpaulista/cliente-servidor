const si = require('systeminformation');

si.getAllData().then(data => console.log(data)).catch(error => console.error(error));