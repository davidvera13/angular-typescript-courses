How to reload dynamically changes in single typescript file 
> we can't use each time tsc app.ts
>  
> We should run: tsc app.ts --watch
> 
> or: tsc app.ts -w

We have to launch first : 
> npm run start


this won't work with more complex project with several files.
> run first : tsc --init
> 
> this generate tsconfig.json
> 
> npm run start
> 
> to compile all ts files, just run : tsc -w

### using third party libraries 
example: lodash
> run npm i --save lodash

importing lodash returns:
> TS7016: Could not find a declaration file for module lodash.

lodash is a javascript lib built for javascript. In node_modules, we have a lodash package containing javascript. 

We need to install type: 

> npm i --save-dev @types/lodash

example class transformer: 
> npm i --save class-transformer
> 
> and
> 
> npm install --save reflect-metadata


example: class-validator

> npm install --save class-validator
