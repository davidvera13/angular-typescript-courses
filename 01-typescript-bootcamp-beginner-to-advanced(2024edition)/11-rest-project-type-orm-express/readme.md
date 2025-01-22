## rest project 
`@types/express` : This package contains type definitions for express (http://expressjs.com).

TO run application: 

> 
>  npm run build
> 
>  npm run start-server
>
> npm install express --save 
>
> npm install rimraf --save -g
>
> npm install typescript --save-dev -g
> 
> npm install @types/express --save-dev -g
>
> npm install @types/node --save-dev -g
>
> npm install npm-run-all --save-dev -g



npm install typescript --save-dev -g npm install @types/express --save-dev -g npm install @types/node --save-dev -g npm install npm-run-all --save-dev -g

### How to add hot reloading
Run :  npm install --save-dev tsc-watch

Update scripts : 

    "scripts": {
        "clean": "rimraf dist",
        "build": "tsc",
        "start-server": "node dist/server.js",
        "start-dev-server": "tsc-wath --onSuccess \"node dist/server.js\"",
        "dev": "npm-run-all clean build start-dev-server"
    },

running npm run dev will execute : 
> run clean, run build, run start-dev-server

to populate db : 
> npm run populate-db

to delete from Db :
> npm run delete-db

### routes

- Home page  : GET http://localhost:9003
- Get courses: GET http://localhost:9003/api/courses 
- Get course : GET http://localhost:9003/api/courses/typescript-bootcamp
- Get course lessons paginated 
  - http://localhost:9003/api/courses/16/lessons
  - http://localhost:9003/api/courses/16/lessons?pageNumber=1&pageSize=5
- Update course: 


