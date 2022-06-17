import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app.js';
import { User } from "../entity/User.js";

let should = chai.should()

chai.use(chaiHttp);

describe('/POST user',()=>{
    it('get 200 if save is successful',(done)=> {
        const user = new User()
        user.age = 18
        user.hobbies = []
        user.username = "Vadim"
        chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err,res)=>{
            res.should.have.status(201);
            res.body.should.have.property('id');
            res.body.should.have.property('age').eql(user.age);
            res.body.should.have.property('hobbies').eql(user.hobbies);
            res.body.should.have.property('username').eql(user.username);
            done();
        });
    });
});