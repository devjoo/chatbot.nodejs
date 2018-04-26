const http = require('http');
const fs = require('fs');

http
    .createServer((req, res) => {
    console.log('req.url : ', req.url);

    if(req.url === '/api/users'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const users = [
            {
                name: 'jiwoo lee',
                age: 50
            }
        ];
        res.end(JSON.stringify(users));
    }else if(req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let html = fs.readFileSync(`${__dirname}/index.html`, 'utf-8');
        const title = 'this is node server';
        html = html.replace('{title}', title);
        res.end(html);
    }else{
        res.writeHead(400)
        res.end()
    }
})
.listen(2018);