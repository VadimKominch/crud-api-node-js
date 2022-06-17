import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app.js';
import { User } from "../entity/User.js";
import { Db } from '../repository/db.js';

let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp);

describe('/DELETE user',()=>{
    it('get 200 if save is successful',(done)=> {
        const user = new User()
        user.age = 18
        user.hobbies = []
        user.username = "Vadim"
        Db.getInstance().saveOne(user)
        Db.getInstance().saveOne(user)
        Db.getInstance().saveOne(user)
        Db.getInstance().saveOne(user)
        Db.getInstance().saveOne(user)
        chai.request(server)
        .delete('/api/users/4')
        .end((err,res)=>{
            res.should.have.status(204);
            console.log(res.body)
            expect(Db.getInstance().getById("4")).to.be.undefined
            done();
        });
    });
});