import request from "supertest"
import { expect } from "chai";

import MessageApp from "../app.js"

describe("Hello World test", function(){
  it("first test", function(done){
    const res = request(MessageApp).get('/')
    res.expect(200).end(function(err, res){
      if(err) {
        return done(err)
      }
      expect(res.body.length).to.equal(1)
      done()
    })
  })
})