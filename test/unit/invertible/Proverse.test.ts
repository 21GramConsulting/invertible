import {Proverse} from "@21gram-consulting/invertible";
import {jest} from "@jest/globals";

describe(`Proverse`, () => {
  it(`should return a totally new function value that acts like a proxy.`, async () => {
    const fn = jest.fn(async <Accumulator>(input: object & Accumulator) => input);
    const proverse = Proverse(fn);
    expect(proverse).not.toBe(fn);
    const input = {a: 1};
    const result = await proverse(input);
    expect(result).toBe(input);
    expect(fn).toHaveBeenCalledWith(input);
  });
});
