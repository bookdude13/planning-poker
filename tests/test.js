// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Rooms", () => {
    describe("GET /:roomId", () => {
        it("should return room page for valid room id", (done) => {
            chai.request(app)
                .get('/rooms/583f98b2-d873-4642-a167-3d0587c0c28b')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("should return 404 for room with bad id", (done) => {
            chai.request(app)
                .get('/rooms/bad-id')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
