import {Proverse} from "./Proverse";
import {Inverse} from "./Inverse";
import {OutputOf} from "./OutputOf";
import * as InputOf from "./InputOf";

export type Invertible<
  Input = any,
  Output = Input
> = Proverse<Input, Output> & {
  readonly inverse: Invertible<Output, Input>
};

export const Invertible = <Input, Output = Input>(
  proverse: Proverse<Input, Output>,
  inverse: Proverse<Output, Input>
): Invertible<Input, Output> => {
  proverse = Proverse(proverse);
  inverse = Inverse(inverse);

  let proverseInvertible: Invertible<Input, Output>;
  // eslint-disable-next-line prefer-const
  let inverseInvertible: Invertible<Output, Input>;

  // eslint-disable-next-line prefer-const
  proverseInvertible = Object.defineProperty(
    proverse,
    `inverse`,
    {get: () => inverseInvertible}
  );

  inverseInvertible = Object.defineProperty(
    inverse,
    `inverse`,
    {get: () => proverseInvertible}
  );

  return proverseInvertible;
};

// TODO: [LOW] Get the test coverage to 100% branch coverage for this one. Not a big issue in TS world, but if a friggin webscripter starts hacking, it could explode.
export type IsInvertible<
  Function extends Proverse
> = Function extends Invertible<InputOf.InputOf<Function>, OutputOf<Function>> ? true : false;
export const isInvertible = <
  Input = any,
  Output = Input
>(
  fn: Proverse<Input, Output>
): fn is Invertible<Input, Output> => {
  if (typeof fn !== `function`) return false;
  if (!(`inverse` in fn)) return false;
  if (typeof fn.inverse !== `function`) return false;
  if (!(`inverse` in fn.inverse)) return false;
  if (fn.inverse.inverse !== fn) return false;
  return true;
};
