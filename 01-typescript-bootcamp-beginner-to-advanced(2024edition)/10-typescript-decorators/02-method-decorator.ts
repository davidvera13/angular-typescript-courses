export enum LoggingLevel {
    ERROR,
    INFO,
    WARN,
    DEBUG,
    TRACE
}

const appMaxLoggingLevel = LoggingLevel.INFO;

// Log function returns a function that MethodDecorator
// we use uppercase method naming
export function Log(level: LoggingLevel): MethodDecorator {
    console.log(`Applying @Log Decorator`);
    // decorator factory with 3 params in signature
    // function is called for each method annotated
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        // java script prototype of the class: we have the list of the methods in the class
        // target:  {
        //   saveData: [Function (anonymous)],
        //   deleteData: [Function (anonymous)]
        // }
        console.log("target: ", target);
        // method name. for each method, we have a property key
        // propertyKey:  saveData or deleteData
        console.log("propertyKey: ", propertyKey);
        // meta data
        // descriptor:  {
        //   value: [Function (anonymous)],
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // }
        console.log("descriptor: ", descriptor);
        // decriptor.value is the method
        const originalFunction = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (level <= appMaxLoggingLevel)
                console.log(`>> Log: ${propertyKey}, ${JSON.stringify(args)}`);
            originalFunction.apply(this, args);
        }
    }
}

export function Perf():MethodDecorator {
    console.log(`Applying @Perf Decorator`);
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalFunction:Function = descriptor.value;
        descriptor.value = function(...args:any[]) {
            // before
            console.log(`started at ${new Date().getTime()}`);
            originalFunction.apply(this,args);
            // after method is called
            console.log(`ended at ${new Date().getTime()}`);
        };
    }
}
