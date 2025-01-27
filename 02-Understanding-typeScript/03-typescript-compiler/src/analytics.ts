"use strict";
console.log("Sending data...")
// console.log("Done...");
let logged;

// TS7006: Parameter event implicitly has an any type.
// if type is any, we must explicitely declare event as any:
//function sendAnalyticsEvent(event): void {
function sendAnalyticsEvent(event: any): void {
    console.log("Sending event..." + event);
    logged = true;
    console.log(logged);
}

sendAnalyticsEvent("myCurrentData...")