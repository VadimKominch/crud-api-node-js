export class ErrorMessage {
    private reason:string
    private message:string

    public constructor(reason:string,message:string) {
        this.reason = reason
        this.message = message
    }
}