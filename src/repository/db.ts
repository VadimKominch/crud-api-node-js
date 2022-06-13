import {User} from '../entity/User.js'

class Db{
    private static instance:Db

    private constructor() {}

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
}