import http from 'http'
import { URL } from 'url'

import { Db } from '../repository/db.js'

const db = Db.getInstance()
function handleRequest(req:http.IncomingMessage,res:http.ServerResponse) {
    console.log(req.url)
    console.log(req.method)
    console.log(req.complete)
    res.statusCode = 200
    res.setHeader("Content-Type","application/json")
    res.end(JSON.stringify({
        name:"Vadim"
    }))
}

export {
    handleRequest
}