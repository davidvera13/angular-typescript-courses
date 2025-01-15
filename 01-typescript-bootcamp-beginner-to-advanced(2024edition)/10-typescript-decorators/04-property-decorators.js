"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseId = DatabaseId;
function DatabaseId() {
    // property decorator factory
    return function (classPrototype, propertyKey) {
        console.log("classPrototype: ", classPrototype);
        console.log("propertyKey: ", propertyKey);
        Object.defineProperty(classPrototype, propertyKey, {
            get: function () {
                if (!this["_id"]) {
                    this["_id"] =
                        Date.now().toString(36) + Math.random().toString(36).slice(2);
                }
                return this["_id"];
            }
        });
    };
}
