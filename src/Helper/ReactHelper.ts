import { shallowCompare } from "./GeneralHelper";

export function AutoBind<T extends Function>(
  target: object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
  if (!descriptor || typeof descriptor.value !== "function") {
    throw new TypeError(
      `Only methods can be decorated with @bind. <${propertyKey}> is not a method!`
    );
  }

  return {
    configurable: true,
    get(this: T): T {
      const bound: T = descriptor.value!.bind(this);
      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: true,
        writable: true
      });
      return bound;
    }
  };
}

export const AvoidUpdate: ClassDecorator = function AvoidUpdate(target) {
  target.prototype.shouldComponentUpdate = function shouldComponentUpdate(
    p,
    s
  ) {
    if (p.children !== this.props.children) {
      return true;
    }
    return shallowCompare(this, p, s);
  };
};
export const NeverUpdate: ClassDecorator = function AvoidUpdate(target) {
  target.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };
};
