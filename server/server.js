import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

require('colors')
const { readFile, stat } = require('fs').promises

const getCurrency = async () => {
  let currency = ''
  await axios('https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD').then(
    async ({ data }) => {
      currency = data.rates
    }
  )
  return currency
}

const getGoods = async () => {
  let response = {}
  const pathToFile = './data/products.json'
  await stat(pathToFile).then(
    await readFile(pathToFile, { encoding: 'utf8' })
      .then(async (text) => {
        response = await JSON.parse(text)
      })
      .catch((err) => {
        return err
      })
  )
  return response
}

let Root

try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/currency', async (req, res) => {
  res.status(200)
  res.json(await getCurrency())
  res.end()
})

server.get('/api/v1/goods', async (req, res) => {
  res.status(200)
  res.json(await getGoods())
  res.end()
})

server.delete('/api/v1/logs', async (req, res) => {
  res.status(200)
  res.json({ status: 'ok' })
  res.end()
})

server.use('/api/*', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
