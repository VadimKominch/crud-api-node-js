import http from 'http'
import { validate } from 'uuid';
import { UserController } from '../controller/UserController.js'
import { User } from '../entity/User.js'
import { ErrorMessage } from '../entity/ErrorMessage.js'

class UserRouter {
    private static instance:UserRouter
    
    private controller:UserController

    private constructor() {
        this.controller = UserController.getInstance()
    }

    public static getInstance(): UserRouter {
        if(!UserRouter.instance) {
            UserRouter.instance = new UserRouter()
        }
        return UserRouter.instance
    }

    public async execute(req:http.IncomingMessage,res:http.ServerResponse) {
        if(req.url?.match(/^\/api\/users$/) && req.method == "GET") await this.getAll(req,res)
        else if(req.url?.match(/^\/api\/users$/) && req.method == "POST") await this.postUser(req,res)
        else if(req.url?.match(/^\/api\/users\//) && req.method == "GET") await this.getOne(req,res) 
        else if(req.url?.match(/^\/api\/users\//) && req.method == "PUT") await this.putUser(req,res)
        else if(req.url?.match(/^\/api\/users\//) && req.method == "DELETE") await this.deleteUser(req,res)
        else
        console.log("Hello")
    }

    private async getOne(req:http.IncomingMessage,res:http.ServerResponse) {
        
        const id = req.url?.split("/")[3]||"";
        if(!this.checkId(id)) {
            this.sendBadRequestForWrongUuid(res)
            return
        } else {
        const result = this.controller.getById(id)
        if(result) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({result}))
        } else{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message:"Entity not found"}))
        }
    }   
    }

    private async getAll(req:http.IncomingMessage,res:http.ServerResponse) {

        const result = this.controller.getAll()
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result))
    }

    private async postUser(req:http.IncomingMessage,res:http.ServerResponse) {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }
  
        const body:User = JSON.parse(Buffer.concat(buffers).toString());
        this.controller.saveOne(body)
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body))
    }

    private async putUser(req:http.IncomingMessage,res:http.ServerResponse) {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const body:User = JSON.parse(Buffer.concat(buffers).toString());
        const id = req.url?.split("/")[3]||"";
        if(!this.checkId(id)) {
            this.sendBadRequestForWrongUuid(res)
            return
        }
        this.controller.updateUser(id,body)
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(body))
    }

    private async deleteUser(req:http.IncomingMessage,res:http.ServerResponse) {
            const id = req.url?.split("/")[3]||"";
            if(!this.checkId(id)) {
                this.sendBadRequestForWrongUuid(res)
                return
            }
            const result = this.controller.getById(id)
            this.controller.deleteUser(id)
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify({status:"OK"}))
    }

    private checkId(id:string) {
        try{
            return parseInt(id)>=0
        } catch(e) {
            return false
        }
        
    }

    private sendBadRequestForWrongUuid(res:http.ServerResponse) {
        res.statusCode = 400
        res.setHeader("Content-Type","application/json")
        const error = new ErrorMessage("Wrong uuid ","Incoming request is not valid")
        res.end(JSON.stringify(error))
    }
}

export const userRouter = UserRouter.getInstance()