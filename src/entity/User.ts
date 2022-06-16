export class User {
    id:string
    username:string
    age:number
    hobbies:Array<string>
    constructor() {
        this.id = "",
        this.username = "",
        this.age = 0,
        this.hobbies = []
    }
}