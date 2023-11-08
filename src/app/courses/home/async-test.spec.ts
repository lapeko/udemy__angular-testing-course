import {fakeAsync, flush, tick} from "@angular/core/testing";

describe("bla bla", () => {
  it("test", fakeAsync(() => {
    let bool = false;

    setTimeout(() => bool = true, 1000);

    tick();
    flush();

    expect(bool).toBeTruthy();
  }));
});
