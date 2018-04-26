const http = require('http')
const fs = require('fs')

http
    .createServer((req, res) => {

    console.log('req.url : ', req.url)
    let _str = fs.readFileSync(`${__dirname}/index.html`, 'utf-8')
    const data = JSON.parse(fs.readFileSync(`${__dirname}/api/movies.json`, 'utf8'))

    if (req.url === '/movies') viewMovies()
    else if(req.url === '/stars') viewStars()
    else if(req.url === '/api/movies') apiMovies()
    else if(req.url === '/api/stars') apiStars()
    else if(req.url === '/api/movies/<영화이름>/stars') return
    else if(req.url === '/api/movies/<영화이름>/starts/<배우 이름>') return
    else if(req.url === '/') index()
    else res.writeHead(400).end()

    function viewMovies() {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        const title = '/movies 영화의 목록 페이지'
        let _movieTitle
        let _list = '<ul>'

        data.forEach(pushList)
        _list += '</ul>'

        _str = _str.replace('{movieList}', _list).replace('{title}', title)

        function pushList(elem, index, arr) {
            _movieTitle = elem.title
            _list   +=  `<li>${_movieTitle}</li>`
        }

        res.end(_str)
    }

    function viewStars() {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        const title = '/stars 배우 목록페이지'

        let _movieActor
        let _list = '<ul>'

        data.forEach(pushList)
        _list += '</ul>'

        _str = _str.replace('{movieList}', _list).replace('{title}', title)

        function pushList(elem, index, arr) {
            _movieActor = elem.actors
            _list   +=  `<li>${_movieActor}</li>`
        }

        res.end(_str)
    }

    function apiMovies() {
        res.writeHead(200, { 'Content-Type': 'application/json'})
        let _movies = []
        data.forEach(function (elem, index, arr) {
            _movies.push(elem.title)
        })
        res.end(JSON.stringify(_movies))
    }

    function apiStars() {
        res.writeHead(200, { 'Content-Type': 'application/json'})
        let _stars = []
        data.forEach(function (elem, index, arr) {
            _stars.push(elem.actors)
        })
        const result = _stars.reduce(function (a, b) {
            return a.concat(b)
        },[]).sort()
        res.end(JSON.stringify(result))
    }

    function index() {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(_str)
    }

})
.listen(2000)
