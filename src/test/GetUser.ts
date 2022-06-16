import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app.js'
let should = chai.should()

chai.use(chaiHttp);

describe('/GET user',()=>{
    it('get first',(done)=> {
        chai.request(server)
        .get('/api/users/1')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });

    it('get first zero',(done)=> {
        chai.request(server)
        .get('/api/users/0')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
});