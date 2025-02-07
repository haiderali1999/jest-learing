const { describe, expect, test } = require("@jest/globals");
const {
  sum,
  fetchData,
  clearCityDatabase,
  isCity,
  initializeCityDatabase,
  db,
  initializeCityDatabasePromise,
  clearCityDatabasePromise,
} = require("./utils");

describe("sum of numbers function", () => {
  test("add two numbers 1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  test("object assignment", () => {
    const data = { name: "hider" };
    data["age"] = 26;
    expect(data).toEqual({ name: "hider", age: 26 });
  });
  test("add positive numbers", () => {
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        expect(i + j).not.toBe(0);
      }
    }
  });
  test("null", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test("zero", () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });
  test("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });
  test("adding floating point numbers", () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });
  test("there is no I in team", () => {
    expect("team").not.toMatch(/I/);
  });

  test('but there is a "stop" in Christoph', () => {
    expect("Christoph").toMatch(/stop/);
  });
  const shoppingList = [
    "diapers",
    "kleenex",
    "trash bags",
    "paper towels",
    "milk",
  ];

  test("the shopping list has milk on it", () => {
    expect(shoppingList).toContain("milk");
    expect(new Set(shoppingList)).toContain("milk");
  });
  function compileAndroidCode() {
    throw new Error("you are using the wrong JDK!");
  }

  test("compiling android goes as expected", () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    // You can also use a string that must be contained in the error message or a regexp
    expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
    expect(() => compileAndroidCode()).toThrow(/JDK/);

    // Or you can match an exact error message using a regexp like below
    // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
    expect(() => compileAndroidCode()).toThrow(
      /^you are using the wrong JDK!$/
    ); // Test pass
  });
  test("the data is peanut butter", () => {
    return fetchData().then((data) => {
      expect(data).toBe("peanut butter");
    });
  });
  test("the data is peanut butter", async () => {
    const data = await fetchData();
    expect(data).toBe("peanut butter");
  });
  test("the fetch fails with an error", async () => {
    // expect.assertions(1);
    try {
      await fetchData();
    } catch (error) {
      expect(error).toMatch("error");
    }
  });
  test("the data is peanut butter", async () => {
    await expect(fetchData()).resolves.toBe("peanut butter");
  });

  //   test('the fetch fails with an error', async () => {
  //     await expect(fetchData()).rejects.toMatch('error');
  //   });
  test("the fetch fails with an error", () => {
    expect.assertions(1);
    const fetchData = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("error")), 100);
      });
    return fetchData().catch((error) => expect(error).toMatch("error"));
  });
  test("the data is peanut butter", (done) => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data).toBe("peanut butter");
        done();
      } catch (error) {
        done(error);
      }
    }

    fetchData(callback);
  });
  beforeEach(() => {
    initializeCityDatabase();
  });

  afterEach(() => {
    clearCityDatabase();
  });

  test("city database has Vienna", () => {
    expect(isCity("Vienna")).toBeTruthy();
  });

  test("city database has San Juan", () => {
    expect(isCity("San Juan")).toBeTruthy();
  });
  beforeAll(() => {
    return initializeCityDatabasePromise();
  });

  afterAll(() => {
    return clearCityDatabasePromise();
  });

  test("city database has Vienna", () => {
    expect(isCity("Vienna")).toBeTruthy();
  });

  test("city database has San Juan", () => {
    expect(isCity("San Juan")).toBeTruthy();
  });
});
