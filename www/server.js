const { createServer } = require('http')
const httpProxy = require('http-proxy')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const proxy = httpProxy.createProxyServer()
const target = 'http://localhost:3001'

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)

    const { pathname, query } = parsedUrl

    switch (pathname) {
      case '/':
        console.log('server pathname = ' + JSON.stringify(pathname));
        app.render(req, res, '/', query)
          break

      case '/login':
        console.log('server pathname = ' + JSON.stringify(pathname));
        app.render(req, res, '/login', query)
          break
  
      case '/contract':
        console.log('server pathname = ' + JSON.stringify(pathname));
        app.render(req, res, '/contract', query)
            break

        case '/api/login':
        console.log('server pathname = ' + JSON.stringify(pathname));
        proxy.web(req, res, { target }, error => {console.log('Error!', error)})
          break
    
        case '/api/logout':
          console.log('server pathname = ' + JSON.stringify(pathname));
          proxy.web(req, res, { target }, error => console.log('Error!', error))
            break
  
        case '/api/contract':
        console.log('server pathname = ' + JSON.stringify(pathname));
        proxy.web(req, res, { target }, error => console.log('Error!', error))
            break
      
      default:
        handle(req, res, parsedUrl)
        break
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
