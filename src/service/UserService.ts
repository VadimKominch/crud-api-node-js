import { Db } from '../repository/db.js'
import {User} from '../entity/User.js'

export class UserService {
    private static instance:UserService
    
    private db:Db

    private constructor() {
        this.db = Db.getInstance()
    }
    
    
    public static getInstance(): UserService {
        if(!UserService.instance) {
            UserService.instance = new UserService()
        }
        return UserService.instance
    }

    public getById(id:string): User {
            return this.db.getById(id)
    }

    public getAll(): Array<User> {
        return this.db.getAll()
    }

    public saveOne(user: User|null) {
        this.db.saveOne(user)
    }

    public updateUser(id:string,userToUpdate:User):User {
        return this.db.updateUser(id,userToUpdate)
    }

    public deleteUser(id:string) {
        this.db.deleteUser(id)
    }
}