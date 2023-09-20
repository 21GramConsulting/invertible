import {Invertible, Proverse} from '@21gram-consulting/invertible';

export function value<Value>(value: Value): Proverse<any, Value>;
export function value<Value, InverseValue>(value: Value, inverseValue: InverseValue): Invertible<InverseValue, Value>;
export function value(value: any, inverseValue?: any): any {
  return inverseValue === undefined
    ? async () => value
    : Invertible(
      async () => value,
      async () => inverseValue
    );
}
