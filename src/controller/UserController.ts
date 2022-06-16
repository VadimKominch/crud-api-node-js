import { UserService } from '../service/UserService.js'
import {User} from '../entity/User.js'

export class UserController {
    private static instance:UserController
    
    private service:UserService

    private constructor() {
        this.service = UserService.getInstance()
    }

    public static getInstance(): UserController {
        if(!UserController.instance) {
            UserController.instance = new UserController()
        }
        return UserController.instance
    }

    public getById(id:string): User {
            return this.service.getById(id)
    }

    public getAll(): Array<User> {
        return this.service.getAll()
    }

    public saveOne(user: User|null) {
        this.service.saveOne(user)
    }

    public updateUser(id:string,userToUpdate:User):User {
        return this.service.updateUser(id,userToUpdate)
    }

    public deleteUser(id:string) {
        this.service.deleteUser(id)
    }
}