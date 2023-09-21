import {Inverse} from "@21gram-consulting/invertible";
import {jest} from "@jest/globals";

describe(`Inverse`, () => {
  it(`should return a totally new function value that acts like a proxy.`, async () => {
    const fn = jest.fn(async <Accumulator>(input: object & Accumulator) => input);
    const inverse = Inverse(fn);
    expect(inverse).not.toBe(fn);
    const input = {a: 1};
    const result = await inverse(input);
    expect(result).toBe(input);
    expect(fn).toHaveBeenCalledWith(input);
  });
});
