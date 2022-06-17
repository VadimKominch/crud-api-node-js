import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app.js';
import { Db } from '../repository/db.js';
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp);

describe('/GET user',()=>{
    it('get 200 with empty array',(done)=> {
        chai.request(server)
        .get('/api/users')
        .end((err,res)=>{
            res.should.have.status(200);
            expect(res.body).to.be.an('array').that.have.lengthOf(Db.getInstance().getAll().length)
            done();
        });
    });
})