const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = 3500;
const server = createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if(req.url === '/'){
        fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (error, data) =>{
            if(error) throw error;
            res.end(data);
        })
    }
})

server.listen(PORT, () =>{
    console.log(`Server is open at http://localhost:${PORT}/`)
})
