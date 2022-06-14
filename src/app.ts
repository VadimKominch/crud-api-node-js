import http from 'http'
import process from 'process'
import { handleRequest } from './server/Server.js'

const port = process.env.PORT || 3000
const server = http.createServer(async (req,res)=>{
    handleRequest(req,res)
})

server.listen(port,()=> {
    console.log(`Server is running at port ${port}`)
})