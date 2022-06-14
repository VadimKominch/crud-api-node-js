import http from 'http'
import { URL } from 'url'

import { ErrorMessage } from '../entity/ErrorMessage.js'

async function handleRequest(req:http.IncomingMessage,res:http.ServerResponse) {   
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const body = Buffer.concat(buffers).toString();
    console.log(req.url)
    const basePath:Array<string> = req.url?.split("/").slice(1).length == 0?req.url?.split("/").slice(1):["/"]
    console.log(basePath)
    switch(basePath[0]){
        case '/':
            res.statusCode = 200
            res.setHeader("Content-Type","application/json")
            res.end(JSON.stringify({
                greeting:"Welcome to user crud api application"
            }))
            break;
        case 'api':
            console.log("Second hello")
            res.statusCode = 200
            res.setHeader("Content-Type","application/json")
            res.end(JSON.stringify({
                greeting:"User api"
            }))
            break;
        default:
            res.statusCode = 404
            res.setHeader("Content-Type","application/json")
            const error = new ErrorMessage(`Wrong request`, `Url ${req.url} not found`)
            res.end(JSON.stringify(error))
            break
    }
}

export {
    handleRequest
}