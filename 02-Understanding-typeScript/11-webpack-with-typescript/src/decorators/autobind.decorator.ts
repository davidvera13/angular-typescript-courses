// Creating & Using an "Autobind" Decorator
// TS6133: 'target' is declared but its value is never read.
// TS6133: 'methodName' is declared but its value is never read.
export function Autobind(
    _: any,             //target: any,
    __: string,         // methodName: string,
    descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedMethod: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundedFn = originalMethod.bind(this);
            return boundedFn;
        }
    }
    return adjustedMethod;
}
