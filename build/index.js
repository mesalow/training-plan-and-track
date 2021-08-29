const http = require('http')

const server = http.createServer((req, res) => {
    console.log('server listening');
    req.on('data', (data) => {
        console.log('receiving data');
    });
    req.on('end', () => {
        console.log('req end')
        res.write('Hello ff');
        res.end();
    })
})

server.listen(3000)