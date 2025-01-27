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
