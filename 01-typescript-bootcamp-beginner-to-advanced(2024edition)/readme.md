## typescript flags

Trans-compile javascript file : 

    tsc 01-why-typescript.ts

Trans-compile javascript file without emitting error message: 

    tsc --noEmitOnError 01-why-typescript.ts

Convert to js and update js when ts is modified

    tsc --watch 06-any.ts

avoid any type noImplicitAny

    tsc --noImplicitAny 06-any.ts

Strict null check validation

    tsc --strictNullChecks 08-non-null-assertion.ts

To debug using type script and not on javascript : 

    tsc --sourceMap 07-debugging.ts


 
