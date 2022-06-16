import http from 'http'
import { URL } from 'url'

import { ErrorMessage } from '../entity/ErrorMessage.js'
import {userRouter} from '../router/UserRouter.js'

async function handleRequest(req:http.IncomingMessage,res:http.ServerResponse) {   

    if(req.url?.startsWith('/api')){
        userRouter.execute(req,res)
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type","application/json")
        const error = new ErrorMessage(`Wrong request`, `Url ${req.url} not found`)
        res.end(JSON.stringify(error))
    }
}

export {
    handleRequest
}