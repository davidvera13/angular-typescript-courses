"use strict";
// export function SealClass(constructor: Function) {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.SealClass = SealClass;
function SealClass() {
    //Object.seal(constructor);
    //Object.seal(constructor.prototype);
    return function (constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}
