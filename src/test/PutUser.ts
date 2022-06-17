import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app.js';
import { User } from "../entity/User.js";
import { Db } from '../repository/db.js';

let should = chai.should()

chai.use(chaiHttp);

describe('/PUT user',()=>{
    it('get 200 if save is successful',(done)=> {
        const user = new User()
        user.age = 18
        user.hobbies = []
        user.username = "Vadim"
        Db.getInstance().saveOne(user)
        user.username = "Changed"
        chai.request(server)
        .put('/api/users/0')
        .send(user)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('id');
            res.body.should.have.property('age').eql(user.age);
            res.body.should.have.property('hobbies').eql(user.hobbies);
            res.body.should.have.property('username').eql("Changed");
            done();
        });
    });
});