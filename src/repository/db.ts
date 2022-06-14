import {User} from '../entity/User.js'

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
        return this.users.filter(el=>el.id == id)[0]
    }

    public getAll(): Array<User> {
        return this.users
    }

    public saveOne(user: User|null) {
        if(user != null) {
            this.users.push(user)
        }
    }

    public updateUser(id:string,userToUpdate:User):User {
        const user = this.getById(id)
        //update
        return user
    }

    public deleteUser(id:string) {
        this.users = this.users.filter(el=>el.id != id)
    }
}