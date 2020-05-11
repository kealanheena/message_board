import { expect } from "chai";
import MessageApp from "./app";

describe("app", () => {

  let testApp
  beforeEach(() => {
    testApp = new MessageApp
    testApp.post('hi world')
  })

  it("app has messages", () => {
    expect(testApp.messages).to.be.an("array");
  });

  it("app creates message (post)", () => {
    testApp.post('hi world')
    expect(testApp.messages.length).to.equal(2)
  });

  it("message has content, date, and id", function(){
    expect(testApp.messages[0].content).to.equal("hi world")
    expect(testApp.messages[0].date).not.to.equal(undefined)
    expect(testApp.messages[0].id).to.equal(0)
  });

  it("app reads (get)", function() {
    expect(testApp.get(0).content).to.equal("hi world")
  });
});
