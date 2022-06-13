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

    public getById(): User {
        return new User()
    }

    public getAll(): Array<User> {
        const elements = new Array<User>()
        elements.push(new User())
        elements.push(new User())
        elements.push(new User())
        return elements
    }

    public saveOne(user: User|null) {
        if(user != null) {
            //save
        }
    }

    public updateUser(id:string,user:User):User {
        return user
    }
}