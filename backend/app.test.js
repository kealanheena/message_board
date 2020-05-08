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
});
