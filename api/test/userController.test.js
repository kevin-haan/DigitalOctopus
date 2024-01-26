const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("UserController", () => {
  describe("GET /users/:id", () => {
    it("sollte einen Benutzer basierend auf der ID abrufen", (done) => {
      const userId = "someUserId";
      chai
        .request(server)
        .get(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.id).to.equal(userId);
          done();
        });
    });
  });

});
