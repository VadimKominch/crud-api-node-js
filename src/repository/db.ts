import {User} from '../entity/User.js'
import { v4 as uuidV4 } from 'uuid';

export class Db{
    private static instance:Db
    private users: Array<User>;
    private constructor() {
        this.users = new Array<User>()
    }

    public static getInstance(): Db {
        if(!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }

    public getById(id:string): User {
        return this.users[parseInt(id)]
    }

    public getAll(): Array<User> {
        return this.users
    }

    public saveOne(user: User|null) {
        if(user != null) {
            user.id = uuidV4()
            this.users.push(user)
            return user
        }
    }

    public updateUser(id:string,userToUpdate:User):User {
        const user = this.getById(id)
        user.age = userToUpdate.age
        user.hobbies = userToUpdate.hobbies
        user.username = userToUpdate.username
        return user
    }

    public deleteUser(id:string) {
        delete this.users[parseInt(id)]
    }
}