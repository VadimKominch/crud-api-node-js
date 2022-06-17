import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app.js';
import { User } from "../entity/User.js";
import { Db } from '../repository/db.js';
let should = chai.should()

chai.use(chaiHttp);

describe('/GET user',()=>{
    it('get 400 error if not valid id passed',(done)=> {
        chai.request(server)
        .get('/api/users/-1')
        .end((err,res)=>{
            res.should.have.status(400);
            done();
        });
    });

    it('get 200 for exisiting ',(done)=> {
        const user = new User()
        user.age = 18
        user.hobbies = []
        user.username = "Vadim"
        Db.getInstance().saveOne(user)

        chai.request(server)
        .get('/api/users/0')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('result');
            res.body.result.should.have.property('id');
            res.body.result.should.have.property('age').eql(user.age);
            res.body.result.should.have.property('hobbies').eql(user.hobbies);
            res.body.result.should.have.property('username').eql(user.username);
            done();
        });
    });

    it('get 404 if nothing exists ',(done)=> {
        chai.request(server)
        .get('/api/users/999')
        .end((err,res)=>{
            res.should.have.status(404);
            done();
        });
    });
});