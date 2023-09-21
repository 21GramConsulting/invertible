import {Invertible, Proverse, isInvertible} from "@21gram-consulting/invertible";

describe(`Invertible`, () => {
  it(`should create an invertible function.`, () => {
    const increment = Invertible<{value: number}>(
      async input => ({...input, value: input.value + 1}),
      async output => ({...output, value: output.value - 1})
    );
    expect(increment({value: 0})).resolves.toEqual({value: 1});
    expect(
      Promise
        .resolve({value: 0})
        .then(increment)
        .then(increment.inverse)
    ).resolves.toEqual({value: 0});
  });
});

describe(`isInvertible`, () => {
  it(`should return true for an invertible function.`, () => {
    const increment = Invertible<{value: number}>(
      async input => ({...input, value: input.value + 1}),
      async output => ({...output, value: output.value - 1})
    );

    expect(isInvertible(increment)).toBe(true);
    // TODO: implement type testing. Have a few ideas by now.
  });

  it(`should return false for a non-invertible function.`, () => {
    type Input = {value: number};
    const increment = Proverse<Input>(async input => ({...input, value: input.value + 1}));
    expect(isInvertible(increment)).toBe(false);
  });
});
