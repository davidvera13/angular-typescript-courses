// export function SealClass(constructor: Function) {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
// }

export function SealClass(): ClassDecorator {
    //Object.seal(constructor);
    //Object.seal(constructor.prototype);
    return (constructor: Function) => {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
}