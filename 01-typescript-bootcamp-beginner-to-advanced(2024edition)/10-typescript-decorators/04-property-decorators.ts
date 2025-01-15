export function DatabaseId(): PropertyDecorator {
    // property decorator factory
    return (classPrototype:any, propertyKey:string) => {
        console.log("classPrototype: ", classPrototype);
        console.log("propertyKey: ", propertyKey);
        Object.defineProperty(classPrototype, propertyKey, {
            get: function() {
                if (!this["_id"]) {
                    this["_id"] =
                        Date.now().toString(36) + Math.random().toString(36).slice(2);
                }
                return this["_id"];
            }
        });

    }
}