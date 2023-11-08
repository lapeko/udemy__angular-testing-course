import {fakeAsync, flush, flushMicrotasks} from "@angular/core/testing";

describe("bla bla", () => {
  it("test timout 1", (done) => {
    let bool = false;

    setTimeout(() => {
      bool = true;
      expect(bool).toBeTruthy();
      done();
    });
  });

  it("test timout 2", fakeAsync(() => {
    let bool = false;

    setTimeout(() => bool = true, 1000);
    flush();

    expect(bool).toBeTruthy();
  }));

  it("test microtasks", fakeAsync(() => {
    let bool = false;

    Promise.resolve()
      .then(() => {
        console.log("Promise resolving 1");
        bool = true;
        return Promise.resolve();
      })
      .then(() => {
        console.log("Promise resolving 2");
        expect(bool).toBeTruthy();
      });

    flushMicrotasks();
  }));
});
