"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingLevel = void 0;
exports.Log = Log;
exports.Perf = Perf;
var LoggingLevel;
(function (LoggingLevel) {
    LoggingLevel[LoggingLevel["ERROR"] = 0] = "ERROR";
    LoggingLevel[LoggingLevel["INFO"] = 1] = "INFO";
    LoggingLevel[LoggingLevel["WARN"] = 2] = "WARN";
    LoggingLevel[LoggingLevel["DEBUG"] = 3] = "DEBUG";
    LoggingLevel[LoggingLevel["TRACE"] = 4] = "TRACE";
})(LoggingLevel || (exports.LoggingLevel = LoggingLevel = {}));
var appMaxLoggingLevel = LoggingLevel.INFO;
// Log function returns a function that MethodDecorator
// we use uppercase method naming
function Log(level) {
    console.log("Applying @Log Decorator");
    // decorator factory with 3 params in signature
    // function is called for each method annotated
    return function (target, propertyKey, descriptor) {
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
        var originalFunction = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (level <= appMaxLoggingLevel)
                console.log(">> Log: ".concat(propertyKey, ", ").concat(JSON.stringify(args)));
            originalFunction.apply(this, args);
        };
    };
}
function Perf() {
    console.log("Applying @Perf Decorator");
    return function (target, propertyKey, descriptor) {
        var originalFunction = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // before
            console.log("started at ".concat(new Date().getTime()));
            originalFunction.apply(this, args);
            // after method is called
            console.log("ended at ".concat(new Date().getTime()));
        };
    };
}
