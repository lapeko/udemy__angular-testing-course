import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {delay} from "rxjs/operators";
import {of} from "rxjs";

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

  it("mix micro and macrotasks", fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => counter++, 1000);
      });

    expect(counter).toBe(0);

    flushMicrotasks();
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(11);
  }));

  it("test observable", fakeAsync(() => {
    let bool = false;

    const observable = of(null).pipe(delay(1000));

    observable.subscribe(() => {
      bool = true;
    });

    tick(1000);
    expect(bool).toBeTruthy();
  }));
});
